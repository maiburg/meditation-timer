import { Injectable } from '@angular/core';

import { SqliteService, StoreService } from '@core/services';
import { Tables } from '@core/models';
import { TimerPresetting } from '@core/models/domain';
import { State } from '@core/models/core';
import { filter, from, Observable, of, take } from 'rxjs';

@Injectable()
export class TimerService {
  tableName = Tables.timerPresetting;

  constructor(private sqlite: SqliteService, private store$: StoreService) {}

  loadAllTimerPresettings(): Observable<TimerPresetting[]> {
    // this.store$
    //   .select((state: State) => state.timerPresettings)
    //   .pipe(
    //     filter(items => !!items),
    //     take(1)
    //   );

    return from(this.sqlite.fetch(this.tableName));
  }

  loadTimerPresettingById(id: number): Observable<TimerPresetting[]> {
    return from(this.sqlite.fetch(this.tableName, id));
  }

  addTimerPresetting(description: string): void {
    this.sqlite.insert(this.tableName, description);
  }

  updateTimerPresetting(timerPresetting: TimerPresetting): void {
    this.sqlite.update(this.tableName, timerPresetting);
  }

  deleteTimerPresettingById(id: number): void {
    id && this.sqlite.delete(this.tableName, id);
  }

  deleteAllTimerPresettings(): void {
    this.sqlite.delete(this.tableName);
  }
}
