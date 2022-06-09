import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Tables, Timer } from '@app/core/models';
import { SqliteService } from '@app/core/services/sqlite.service';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerResolver implements Resolve<Timer[]> {
  constructor(private sqlite: SqliteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Timer[]> {
    // TODO: Write test
    const id = +route.paramMap.get('timerId') || null;

    return from(this.sqlite.fetch(Tables.timer, id));
  }
}
