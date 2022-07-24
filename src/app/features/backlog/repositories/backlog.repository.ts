import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { PtItem } from '@core/models/domain';
import { AppConfig } from '@core/models/core';
import { APP_CONFIG } from '@src/config/app-config.module';
import { PresetType } from '@shared/models/ui/types/presets';

@Injectable()
export class BacklogRepository {
  constructor(@Inject(APP_CONFIG) private readonly config: AppConfig, private readonly http: HttpClient) {}

  getPtItems(
    currentPreset: PresetType,
    currentUserId: number,
    errorHandler: (error: any) => Observable<string>,
    successHandler: (data: PtItem[]) => void
  ): void {
    this.http
      .get(this.getFilteredBacklogUrl(currentPreset, currentUserId))
      .pipe(catchError(errorHandler))
      .subscribe(successHandler);
  }

  getPtItem(
    ptItemId: number,
    errorHandler: (error: any) => Observable<string>,
    successHandler: (ptItem: PtItem) => void
  ) {
    this.http.get(this.getPtItemUrl(ptItemId)).pipe(catchError(errorHandler)).subscribe(successHandler);
  }

  private getPtItemUrl(itemId: number) {
    return `${this.config.apiEndpoint}/item/${itemId}`;
  }

  private getFilteredBacklogUrl(currentPreset: PresetType, currentUserId?: number) {
    switch (currentPreset) {
      case 'my':
        if (currentUserId) {
          return `${this.config.apiEndpoint}/myItems?userId=${currentUserId}`;
        } else {
          return `${this.config.apiEndpoint}/backlog`;
        }
      case 'open':
        return `${this.config.apiEndpoint}/openItems`;
      case 'closed':
        return `${this.config.apiEndpoint}/closedItems`;
      default:
        return `${this.config.apiEndpoint}/backlog`;
    }
  }
}
