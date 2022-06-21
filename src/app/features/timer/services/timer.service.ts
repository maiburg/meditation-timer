import { Injectable } from '@angular/core';

import { SqliteService } from '@core/services';
import { Tables } from '@core/models';
import { TimerPresetting } from '@core/models/domain';

@Injectable()
export class TimerService {
  tableName = Tables.timerPresetting;

  constructor(private readonly sqlite: SqliteService) {}

  loadAllTimerPresettings(): Promise<TimerPresetting[]> {
    return this.sqlite.fetch(this.tableName).then();
  }

  loadTimerPresettingById(id: number): Promise<TimerPresetting[]> {
    return this.sqlite.fetch(this.tableName, id).then();
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
