import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { SqliteService } from '@core/services';
import { Tables } from '@core/models';
import { TimerPresetting } from '@core/models/domain';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  list$: Subject<any[]> = new BehaviorSubject<any[]>(null);
  tableName = Tables.timer;

  constructor(private readonly sqlite: SqliteService) {}

  add(): void {
    this.sqlite.insert(this.tableName).then(() => this.fetch());
  }

  fetch(): void {
    this.sqlite.fetch(this.tableName).then((rows: TimerPresetting[]) => this.list$.next(rows));
  }

  delete(id: number): void {
    id && this.sqlite.delete(this.tableName, id).then(() => this.fetch());
  }

  deleteAll(): void {
    this.sqlite.delete(this.tableName).then(() => this.fetch());
  }
}
