import { Inject, Injectable, NgZone } from '@angular/core';
import { APP_CONFIG } from '@src/config/app-config.module';
import { AppConfig } from '@core/models/core';

import { PtItem } from '@core/models/domain';
import { ServerErrorHandlerService, StoreService } from '@core/services';
import { BacklogRepository } from '@features/backlog/repositories';

@Injectable()
export class BacklogService {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private repo: BacklogRepository,
    private store: StoreService,
    private errorHandlerService: ServerErrorHandlerService,
    private zone: NgZone
  ) {}

  fetchItems(): void {
    this.repo.getPtItems(this.errorHandlerService.handleHttpError, (ptItems: PtItem[]) => this.runInZone(ptItems));
  }

  private runInZone(ptItems: PtItem[]) {
    return this.zone.run(() => this.setStore(ptItems));
  }

  private setStore(ptItems: PtItem[]) {
    this.store.set({ backlogItems: ptItems });
  }
}
