import { TestBed } from '@angular/core/testing';

import { TimerFacade } from '@app/features/timer/timer.facade';
import { SqliteService } from '@app/core/services';
import { last } from 'rxjs';

describe('TimerFacade', () => {
  let facade: TimerFacade;
  let sqlite: SqliteService;

  beforeEach(() => {
    facade = TestBed.inject(TimerFacade);
    sqlite = TestBed.inject(SqliteService);
  });

  describe('add() should', () => {
    const methodUnderTest = () => facade.add();

    it('call sqlite.insert() with table name', () => {
      const spy = spyOn(sqlite, 'insert').and.returnValue(Promise.resolve(1));

      methodUnderTest();

      expect(spy).toHaveBeenCalledOnceWith(facade.tableName);
    });

    it('call this.fetch()', done => {
      const spy = spyOn(facade, 'fetch');

      methodUnderTest();

      sqlite.insert(facade.tableName).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      done();
    });
  });

  describe('fetch() should', () => {
    const methodUnderTest = () => facade.fetch();

    it('call sqlite.fetch(this.tableName)', () => {
      const spy = spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve([1, 'foo']));

      methodUnderTest();

      expect(spy).toHaveBeenCalledOnceWith(facade.tableName);
    });

    it('put fetched data into list$ by calling this.list$.next(rows)', () => {
      const rows: any[][] = [
        [1, 'foo'],
        [2, 'bar'],
        [3, 'baz']
      ];
      spyOn(sqlite, 'fetch').and.returnValue(Promise.resolve(rows));

      methodUnderTest();

      facade.list$.pipe(last()).subscribe(value => expect(value).toEqual(rows));
    });
  });

  describe('delete() should', () => {
    const id = 1;
    const methodUnderTest = () => facade.delete(id);

    it('call sqlite.delete(this.table, 1)', () => {
      const spy = spyOn(sqlite, 'delete').and.returnValue(Promise.resolve(1));

      methodUnderTest();

      expect(spy).toHaveBeenCalledOnceWith(facade.tableName, id);
    });

    it('call this.fetch()', done => {
      const spy = spyOn(facade, 'fetch');

      methodUnderTest();

      sqlite.delete(facade.tableName, id).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
      done();
    });
  });

  describe('deleteAll() should', () => {
    const methodUnderTest = () => facade.deleteAll();

    it('call sqlite.delete(this.table, 1)', () => {
      const id = 1;
      const spy = spyOn(sqlite, 'delete').and.returnValue(Promise.resolve(1));

      methodUnderTest();

      expect(spy).toHaveBeenCalledOnceWith(facade.tableName, id);
    });

    it('call this.fetch()', () => {
      const spy = spyOn(facade, 'fetch');

      methodUnderTest();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
