import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { from, Observable } from 'rxjs';

import { TimerPresetting } from '@core/models/domain';
import { TimerService } from '@app/features/timer/services';

@Injectable()
export class TimerResolver implements Resolve<TimerPresetting[]> {
  constructor(private timerService: TimerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<TimerPresetting[]> {
    const id: number = +route?.paramMap.get('timerId');
    const data = id ? this.timerService.loadTimerPresettingById(id) : this.timerService.loadAllTimerPresettings();
    return from(data);
  }
}
