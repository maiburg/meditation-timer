import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { PtItem } from '@core/models/domain';
import { AppConfig } from '@core/models/core';
import { APP_CONFIG } from '@src/config/app-config.module';

@Injectable()
export class BacklogRepository {
  constructor(@Inject(APP_CONFIG) private readonly config: AppConfig, private readonly http: HttpClient) {}

  getPtItems(errorHandler: (error: any) => Observable<any>, successHandler: (data: PtItem[]) => void) {
    this.http.get(this.backlogUrl).pipe(catchError(errorHandler)).subscribe(successHandler);
  }

  private get backlogUrl() {
    return `${this.config.apiEndpoint}/backlog`;
  }
}
