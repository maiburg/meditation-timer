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

  public fetchItems() {
    this.repo.getPtItems(this.errorHandlerService.handleHttpError, (ptItems: PtItem[]) =>
      this.zone.run(() => this.store.set({ backlogItems: ptItems }))
    );
  }
}
