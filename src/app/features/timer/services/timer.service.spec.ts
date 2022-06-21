import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker/locale/de';

import { TimerService } from '@app/features/timer/services';
import { TimerPresetting } from '@core/models/domain';
import { SqliteService } from '@core/services';

describe('TimerService', () => {
  let service: TimerService;
  let sqlite: SqliteService;

  const timer1: TimerPresetting = { id: 1, description: faker.lorem.words(10) };
  const timer2: TimerPresetting = { id: 2, description: faker.lorem.words(10) };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimerService, SqliteService]
    });
    service = TestBed.inject(TimerService);
    sqlite = TestBed.inject(SqliteService);
  });

  describe('loadAllTimerPresettings() should', () => {
    it('call sqlite.fetch(this.tableName)', () => {
      const spy = spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve([timer1, timer2]));

      service.loadAllTimerPresettings();

      expect(spy).toHaveBeenCalledOnceWith(service.tableName);
    });

    it('return fetched data', async () => {
      const expected = [timer1, timer2];
      spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve(expected));

      await expectAsync(service.loadAllTimerPresettings()).toBeResolvedTo([timer1, timer2]);
    });
  });

  describe('loadTimerPresettingById() should', () => {
    it('call sqlite.fetch(this.tableName, id)', () => {
      const id = 1;
      const spy = spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve([timer1]));

      service.loadTimerPresettingById(id);

      expect(spy).toHaveBeenCalledOnceWith(service.tableName, id);
    });

    it('return fetched data', async () => {
      const expected = [timer1];
      spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve(expected));

      await expectAsync(service.loadTimerPresettingById(1)).toBeResolvedTo(expected);
    });
  });

  describe('addTimerPresetting() should', () => {
    it('call sqlite.insert() with table name', () => {
      const spy = spyOn(sqlite, 'insert');
      const description = faker.lorem.words(10);

      service.addTimerPresetting(description);

      expect(spy).toHaveBeenCalledOnceWith(service.tableName, description);
    });
  });

  describe('updateTimerPresetting() should', () => {
    it('call sqlite.update() with table name and timerPresetting', () => {
      const spy = spyOn(sqlite, 'update');

      service.updateTimerPresetting(timer1);

      expect(spy).toHaveBeenCalledOnceWith(service.tableName, timer1);
    });
  });

  describe('deleteTimerPresettingById() should', () => {
    it('call sqlite.deleteTimerPresettingById(this.table, 1)', () => {
      const id = 1;
      const spy = spyOn(sqlite, 'delete');

      service.deleteTimerPresettingById(id);

      expect(spy).toHaveBeenCalledOnceWith(service.tableName, id);
    });
  });

  describe('deleteAllTimerPresettings() should', () => {
    it('call sqlite.deleteTimerPresettingById(this.table)', () => {
      const spy = spyOn(sqlite, 'delete');

      service.deleteAllTimerPresettings();

      expect(spy).toHaveBeenCalledOnceWith(service.tableName);
    });
  });
});
