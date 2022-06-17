import { TestBed } from '@angular/core/testing';
import { last } from 'rxjs';

import { TimerFacade } from '@app/features/timer/services/timer.facade';
import { Timer } from '@core/models/domain';
import { SqliteService } from '@core/services';

describe('TimerFacade', () => {
  let facade: TimerFacade;
  let sqlite: SqliteService;

  beforeEach(() => {
    facade = TestBed.inject(TimerFacade);
    sqlite = TestBed.inject(SqliteService);
  });

  describe('add() should', () => {
    it('call sqlite.insert() with table name', () => {
      const spy = spyOn(sqlite, 'insert').and.returnValue(Promise.resolve(1));

      facade.add();

      expect(spy).toHaveBeenCalledOnceWith(facade.tableName);
    });

    it('call this.fetch()', done => {
      const spy = spyOn(facade, 'fetch');

      facade.add();

      sqlite.insert(facade.tableName).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      done();
    });
  });

  describe('fetch() should', () => {
    it('call sqlite.fetch(this.tableName)', () => {
      const timer: Timer = { id: 1, description: 'foo' };
      const spy = spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve([timer]));

      facade.fetch();

      expect(spy).toHaveBeenCalledOnceWith(facade.tableName);
    });

    it('put fetched data into list$ by calling this.list$.next(rows)', () => {
      const timers: Timer[] = [
        { id: 1, description: 'foo' },
        { id: 2, description: 'bar' },
        { id: 3, description: 'baz' }
      ];
      spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve(timers));

      facade.fetch();

      facade.list$.pipe(last()).subscribe(value => expect(value).toEqual(timers));
    });
  });

  describe('delete() should', () => {
    const id = 1;

    it('call sqlite.delete(this.table, 1)', () => {
      const spy = spyOn(sqlite, 'delete').and.returnValue(Promise.resolve(1));

      facade.delete(id);

      expect(spy).toHaveBeenCalledOnceWith(facade.tableName, id);
    });

    it('call this.fetch()', done => {
      const spy = spyOn(facade, 'fetch');

      facade.delete(id);

      sqlite.delete(facade.tableName, id).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
      done();
    });
  });

  describe('deleteAll() should', () => {
    it('call sqlite.delete(this.table, 1)', () => {
      const id = 1;
      const spy = spyOn(sqlite, 'delete').and.returnValue(Promise.resolve(1));

      facade.deleteAll();

      expect(spy).toHaveBeenCalledOnceWith(facade.tableName);
    });

    it('call this.fetch()', done => {
      const spy = spyOn(facade, 'fetch');

      facade.deleteAll();

      sqlite.delete(facade.tableName).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
      done();
    });
  });
});
