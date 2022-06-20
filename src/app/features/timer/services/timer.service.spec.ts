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

  describe('add() should', () => {
    it('call sqlite.insert() with table name', () => {
      const spy = spyOn(sqlite, 'insert').and.returnValue(Promise.resolve(1));

      service.add();

      expect(spy).toHaveBeenCalledOnceWith(service.tableName);
    });
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

  describe('delete() should', () => {
    const id = 1;

    it('call sqlite.delete(this.table, 1)', () => {
      const spy = spyOn(sqlite, 'delete').and.returnValue(Promise.resolve(1));

      service.delete(id);

      expect(spy).toHaveBeenCalledOnceWith(service.tableName, id);
    });
  });

  describe('deleteAll() should', () => {
    it('call sqlite.delete(this.table, 1)', () => {
      const id = 1;
      const spy = spyOn(sqlite, 'delete').and.returnValue(Promise.resolve(1));

      service.deleteAll();

      expect(spy).toHaveBeenCalledOnceWith(service.tableName);
    });
  });
});
