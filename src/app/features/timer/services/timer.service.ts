import { Injectable } from '@angular/core';

import { TimerModule } from '@app/features/timer/timer.module';
import { SqliteService } from '@core/services';
import { Tables } from '@core/models';
import { TimerPresetting } from '@core/models/domain';

@Injectable()
export class TimerService {
  tableName = Tables.timer;

  constructor(private readonly sqlite: SqliteService) {}

  add(): void {
    this.sqlite.insert(this.tableName).then();
  }

  loadAllTimerPresettings(): Promise<TimerPresetting[]> {
    return this.sqlite.fetch(this.tableName).then();
  }

  loadTimerPresettingById(id: number): Promise<TimerPresetting[]> {
    return this.sqlite.fetch(this.tableName, id).then();
  }

  delete(id: number): void {
    id && this.sqlite.delete(this.tableName, id).then();
  }

  deleteAll(): void {
    this.sqlite.delete(this.tableName).then();
  }
}
