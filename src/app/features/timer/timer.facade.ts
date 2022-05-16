import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { SqliteService } from '@app/core/services';
import { Tables } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class TimerFacade {
  list$: Subject<any[]> = new BehaviorSubject<any[]>(null);
  tableName = Tables.timer;

  constructor(private readonly sqlite: SqliteService) {
    this.fetch();
  }

  add(): void {
    this.sqlite.insert(this.tableName).then(() => this.fetch());
  }

  fetch(): void {
    this.sqlite.fetch(this.tableName).then((rows: any[]) => this.list$.next(rows));
  }

  delete(id: number): void {
    id && this.sqlite.delete(this.tableName, id).then(() => this.fetch());
  }

  deleteAll(): void {
    this.sqlite.delete(this.tableName).then(() => this.fetch());
  }
}
