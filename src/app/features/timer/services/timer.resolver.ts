import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { from, Observable } from 'rxjs';

import { Tables } from '@core/models';
import { TimerPresetting } from '@core/models/domain';
import { SqliteService } from '@app/core/services';

@Injectable()
export class TimerResolver implements Resolve<TimerPresetting[]> {
  constructor(private sqlite: SqliteService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<TimerPresetting[]> {
    const id = +route?.paramMap.get('timerId') || null;
    //TODO: Get data from TimerService, not from SqliteService
    return from(this.sqlite.fetch(Tables.timer, id));
  }
}
