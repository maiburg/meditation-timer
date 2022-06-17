import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { from, Observable } from 'rxjs';

import { Tables } from '@core/models';
import { Timer } from '@core/models/domain';
import { SqliteService } from '@app/core/services';

@Injectable()
export class TimerResolver implements Resolve<Timer[]> {
  constructor(private sqlite: SqliteService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Timer[]> {
    const id = +route?.paramMap.get('timerId') || null;
    //TODO: Get data from TimerFacade, not from SqliteService
    return from(this.sqlite.fetch(Tables.timer, id));
  }
}
