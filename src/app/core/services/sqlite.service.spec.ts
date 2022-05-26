import { TestBed } from '@angular/core/testing';

import { SqliteService } from '@app/core/services/sqlite.service';
import { Tables } from '@app/core/models';

let Sqlite = require('nativescript-sqlite');

describe('SqliteService', () => {
  let service: SqliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteService);
    service.deleteDB();
  });

  describe('getDBConnection() should', () => {
    it('return a new Sqlite instance', () => {
      service.getDBConnection().then(db => {
        expect(db.execSQL).toBeDefined();
        expect(db.all).toBeDefined();
        expect(db.get).toBeDefined();
        expect(db.close).toBeDefined();
      });
    });
  });

  describe('closeDBConnection() should', () => {
    it('call service.getDBConnection()', () => {
      const db = new Sqlite(service.dbName);
      const spy = spyOn(service, 'getDBConnection').and.returnValue(Promise.resolve(db));

      service.closeDBConnection();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('initDB() should', () => {
    it(`call service.getDBConnection() if dbExists returns FALSE`, () => {
      spyOnProperty(service, 'dbExists', 'get').and.returnValue(false);
      const db = new Sqlite(service.dbName);
      const spy = spyOn(service, 'getDBConnection').and.returnValue(Promise.resolve(db));

      service.initDB();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it(`NOT call service.getDBConnection() if dbExists returns TRUE`, () => {
      spyOnProperty(service, 'dbExists', 'get').and.returnValue(true);
      const spy = spyOn(service, 'getDBConnection');

      service.initDB();

      expect(spy).not.toHaveBeenCalled();
    });

    it(`create a database`, () => {
      expect(Sqlite.exists(service.dbName)).toBeFalsy();

      service.initDB();

      expect(Sqlite.exists(service.dbName)).toBeTruthy();
    });

    Object.values(Tables).forEach(tableName => {
      it(`create table '${tableName}'`, () => {
        service.initDB();

        service.getDBConnection().then(db =>
          db.all(`SELECT name FROM sqlite_master WHERE type='table'`).then((tables: string[][]) => {
            const tableNames: string[] = [].concat(...tables);

            expect(tableNames.indexOf(tableName)).toBeGreaterThan(-1);
          })
        );
      });
    });

    Object.values(Tables).forEach(tableName => {
      it(`create columns in table '${tableName}'`, () => {
        service.initDB();

        service.getDBConnection().then(db =>
          db.all(`SELECT name FROM PRAGMA_TABLE_INFO('${tableName}')`).then(columns => {
            const columnNames: string[] = [].concat(...columns);

            expect(columnNames.indexOf('id')).toBeGreaterThan(-1);
          })
        );
      });
    });
  });

  describe('fetch() should', () => {
    it('return database rows', () => {
      service.initDB();

      service.fetch(Tables.timer).then((rows: any[]) => {
        expect(rows.length).toBe(2);
        expect(rows[0][0]).toBe(1);
        expect(rows[1][0]).toBe(2);

        // done();
      });
    });
  });

  describe('insert() should', () => {
    it('insert database rows', () => {
      service.initDB();

      service.insert(Tables.timer).then(() =>
        service.fetch(Tables.timer).then((rows: any[]) => {
          expect(rows.length).toBe(3);
          expect(rows[rows.length - 1][0]).toBe(3);
          expect(rows[rows.length - 1][1]).toBe('Ananas');
        })
      );

      expect(service).toBeTruthy();
    });
  });

  describe('delete() should', () => {
    it('delete a row by id', () => {
      service.initDB();

      service.delete(Tables.timer, 1).then(() =>
        service.fetch(Tables.timer).then((rows: any[]) => {
          expect(rows.length).toBe(1);
          expect(rows[0][0]).toBe(2);
        })
      );
    });

    it('delete all rows when no id is provided', () => {
      service.initDB();

      service.delete(Tables.timer).then(() =>
        service.fetch(Tables.timer).then((rows: any[]) => {
          expect(rows.length).toBeFalsy();
        })
      );
    });
  });

  describe('dbExists should', () => {
    it('be TRUE if an db exists', () => {
      service.initDB();

      expect(service.dbExists).toBeTrue();
    });

    it('be FALSE if no db exists', () => {
      expect(service.dbExists).toBeFalse();
    });
  });
});
