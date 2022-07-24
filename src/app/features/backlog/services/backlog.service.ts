import { Inject, Injectable, NgZone } from '@angular/core';
import { APP_CONFIG } from '@src/config/app-config.module';
import { AppConfig } from '@core/models/core';

import { PtItem, PtUser } from '@core/models/domain';
import { ServerErrorHandlerService, StoreService } from '@core/services';
import { BacklogRepository } from '@features/backlog/repositories';

@Injectable()
export class BacklogService {
  private get currentPreset() {
    return this.store.state.selectedPreset;
  }

  private get currentUserId() {
    if (this.store.state.currentUser) {
      return this.store.state.currentUser.id;
    } else {
      return undefined;
    }
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private repo: BacklogRepository,
    private store: StoreService,
    private errorHandlerService: ServerErrorHandlerService,
    private zone: NgZone
  ) {}

  fetchItems() {
    return new Promise<void>((resolve, reject) => {
      this.repo.getPtItems(
        this.currentPreset,
        this.currentUserId,
        error => {
          reject(error);
          return this.errorHandlerService.handleHttpError(error);
        },
        (backlogItems: PtItem[]) => {
          backlogItems.forEach(item => {
            this.setUserAvatarUrl(item.assignee);
            item.comments.forEach(c => this.setUserAvatarUrl(c.user));
          });

          this.zone.run(() => {
            this.store.set({ backlogItems });
            resolve();
          });
        }
      );
    });
  }

  getItemFromCacheOrServer(id: number) {
    const selectedItem = this.store.state.backlogItems.find(i => i.id === id);

    if (selectedItem) {
      this.zone.run(() => this.store.set({ currentSelectedItem: selectedItem }));
    } else {
      this.getPtItem(id);
    }
  }

  private setUserAvatarUrl(user: PtUser) {
    user.avatar = `${this.config.apiEndpoint}/photo/${user.id}`;
  }

  getPtItem(id: number) {
    this.repo.getPtItem(id, this.errorHandlerService.handleHttpError, (currentSelectedItem: PtItem) => {
      this.setUserAvatarUrl(currentSelectedItem.assignee);
      currentSelectedItem.comments.forEach(c => this.setUserAvatarUrl(c.user));

      this.zone.run(() => {
        this.store.set({ currentSelectedItem });
        // optimistically update the item list with the new item
        const backlogItems = this.store.state.backlogItems.map(item => (item.id === id ? currentSelectedItem : item));
        this.store.set({ backlogItems });
      });
    });
  }
}
