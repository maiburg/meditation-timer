import { TestBed } from '@angular/core/testing';
import { last } from 'rxjs';

import { TimerService } from '@app/features/timer/services';
import { TimerPresetting } from '@core/models/domain';
import { SqliteService } from '@core/services';

describe('TimerService', () => {
  let service: TimerService;
  let sqlite: SqliteService;

  beforeEach(() => {
    service = TestBed.inject(TimerService);
    sqlite = TestBed.inject(SqliteService);
  });

  describe('add() should', () => {
    it('call sqlite.insert() with table name', () => {
      const spy = spyOn(sqlite, 'insert').and.returnValue(Promise.resolve(1));

      service.add();

      expect(spy).toHaveBeenCalledOnceWith(service.tableName);
    });

    it('call this.fetch()', done => {
      const spy = spyOn(service, 'fetch');

      service.add();

      sqlite.insert(service.tableName).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      done();
    });
  });

  describe('fetch() should', () => {
    it('call sqlite.fetch(this.tableName)', () => {
      const timer: TimerPresetting = { id: 1, description: 'foo' };
      const spy = spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve([timer]));

      service.fetch();

      expect(spy).toHaveBeenCalledOnceWith(service.tableName);
    });

    it('put fetched data into list$ by calling this.list$.next(rows)', () => {
      const timers: TimerPresetting[] = [
        { id: 1, description: 'foo' },
        { id: 2, description: 'bar' },
        { id: 3, description: 'baz' }
      ];
      spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve(timers));

      service.fetch();

      service.list$.pipe(last()).subscribe(value => expect(value).toEqual(timers));
    });
  });

  describe('delete() should', () => {
    const id = 1;

    it('call sqlite.delete(this.table, 1)', () => {
      const spy = spyOn(sqlite, 'delete').and.returnValue(Promise.resolve(1));

      service.delete(id);

      expect(spy).toHaveBeenCalledOnceWith(service.tableName, id);
    });

    it('call this.fetch()', done => {
      const spy = spyOn(service, 'fetch');

      service.delete(id);

      sqlite.delete(service.tableName, id).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
      done();
    });
  });

  describe('deleteAll() should', () => {
    it('call sqlite.delete(this.table, 1)', () => {
      const id = 1;
      const spy = spyOn(sqlite, 'delete').and.returnValue(Promise.resolve(1));

      service.deleteAll();

      expect(spy).toHaveBeenCalledOnceWith(service.tableName);
    });

    it('call this.fetch()', done => {
      const spy = spyOn(service, 'fetch');

      service.deleteAll();

      sqlite.delete(service.tableName).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
      done();
    });
  });
});
