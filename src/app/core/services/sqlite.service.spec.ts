import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker/locale/de';

import { SqliteService } from '@core/services';
import { Tables } from '@app/core/models';
import { TimerPresetting } from '@core/models/domain';

let Sqlite = require('nativescript-sqlite');

const table = Tables.timerPresetting;

describe('SqliteService', () => {
  let service: SqliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SqliteService]
    });
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

      expect(spy).toHaveBeenCalledTimes(3);
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

      service.fetch(Tables.timerPresetting).then((rows: TimerPresetting[]) => {
        expect(rows.length).toBe(2);
        expect(rows[0].id).toBe(1);
        expect(rows[1].id).toBe(2);
      });
    });
  });

  describe('insert() should', () => {
    it('call execSQL()', () => {
      const spy = spyOn<any>(service, 'execSQL');
      const description = faker.lorem.words(10);
      const expected = [`INSERT INTO ${table} (description) VALUES (?)`, [description]];
      service.initDB();

      service.insert(table, description);

      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe('update() should', () => {
    it('call execSQL()', () => {
      const spy = spyOn<any>(service, 'execSQL');
      const description = faker.lorem.words(10);
      const id = 1;
      const columns: TimerPresetting = { id, description };
      const expected = [`UPDATE ${table} SET description = '${description}' WHERE id=${id}`];
      service.initDB();

      service.update(table, columns);

      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe('delete() should', () => {
    it('call execSQL()', () => {
      const spy = spyOn<any>(service, 'execSQL');
      const id = 1;
      const expected = [`DELETE FROM ${table}` + `${id ? ' WHERE id=' + id : ''}`];
      service.initDB();

      service.delete(table, id);

      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe('execSQL() should', () => {
    it('insert a new record', () => {
      const description = faker.lorem.words(10);
      const statement = [`INSERT INTO ${table} (description) VALUES (?)`, [description]];
      service.initDB();

      service['execSQL'](statement);

      service.fetch(Tables.timerPresetting).then((rows: TimerPresetting[]) => {
        expect(rows.length).toBe(3);
        expect(rows[rows.length - 1].id).toBe(3);
        expect(rows[rows.length - 1].description).toBe(description);
      });
    });

    it('update a record', () => {
      const description = faker.lorem.words(10);
      const id = 1;
      const statement = [`UPDATE ${table} SET description = '${description}' WHERE id=${id}`];
      service.initDB();

      service.fetch(Tables.timerPresetting).then((rows: TimerPresetting[]) => {
        expect(rows[0].description).not.toBe(description);

        service['execSQL'](statement);

        service.fetch(Tables.timerPresetting).then((rows: TimerPresetting[]) => {
          expect(rows[0].description).toBe(description);
        });
      });
    });

    it('delete a record', () => {
      const id = 2;
      const statement = [`DELETE FROM ${table}` + `${id ? ' WHERE id=' + id : ''}`];
      service.initDB();

      service.fetch(Tables.timerPresetting).then((rows: TimerPresetting[]) => {
        expect(rows.length).toBe(2);

        service['execSQL'](statement);

        service.fetch(Tables.timerPresetting).then((rows: TimerPresetting[]) => {
          expect(rows.length).toBe(1);
        });
      });
    });
  });

  describe('getObjectFromRow() should', () => {
    it('return an object of type TimerPresetting', () => {
      const id = faker.datatype.number({ min: 1, max: 99999 });
      const description = faker.lorem.words(10);

      expect(service['getObjectFromRow'](table, [id, description])).toEqual({ id, description });
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
