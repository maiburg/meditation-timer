import { Injectable } from '@angular/core';

import { ISqlStatement, SqlStatementType, Tables } from '@app/core/models';

let Sqlite = require('nativescript-sqlite');

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  dbName = 'mt.db3';
  sqlStatements: ISqlStatement[] = [
    {
      type: SqlStatementType.create,
      statement: [`CREATE TABLE IF NOT EXISTS ${Tables.timer} (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT)`]
    },
    {
      type: SqlStatementType.insert,
      statement: [`INSERT INTO ${Tables.timer} (description) VALUES (?)`, ['Dies']]
    },
    {
      type: SqlStatementType.insert,
      statement: [`INSERT INTO ${Tables.timer} (description) VALUES (?)`, ['Das']]
    }
  ];

  constructor() {}

  getDBConnection(): any {
    return new Sqlite(this.dbName);
  }

  closeDBConnection(): void {
    this.getDBConnection().then(db => db.close());
  }

  initDB() {
    if (!Sqlite.exists('mt.db3')) {
      this.getDBConnection().then(
        db =>
          this.sqlStatements.forEach(item => {
            db.execSQL(...item.statement).then(
              id => console.log(item.type, id || 'DB'),
              error => console.log(item.type, error)
            );
          }),
        error => console.log('OPEN DB ERROR', error)
      );
    }
  }

  fetch(table: string) {
    const args = `SELECT * FROM ${table}`;

    return new Promise<Object>((resolve, reject) => {
      this.getDBConnection().then(
        db =>
          db.all(args).then(
            rows => resolve(rows),
            err => console.log(SqlStatementType.select, err)
          ),
        error => console.log('OPEN DB ERROR', error)
      );
    }).then();
  }

  insert(table: string) {
    const args = [`INSERT INTO ${table} (description) VALUES (?)`, ['Ananas']];

    return new Promise<Object>((resolve, reject) => {
      this.getDBConnection().then(
        db => {
          db.execSQL(...args).then(
            id => resolve(id),
            err => console.log(SqlStatementType.insert, err)
          );
        },
        error => console.log('OPEN DB ERROR', error)
      );
    }).then();
  }

  delete(table: Tables, id?: number) {
    const statement = id ? `DELETE FROM ${table} WHERE id = ${id}` : `DELETE FROM ${table}`;

    return new Promise<Object>((resolve, reject) => {
      this.getDBConnection().then(
        db =>
          db.execSQL(statement).then(
            id => resolve(id),
            error => console.log(SqlStatementType.delete, error)
          ),
        error => console.log('OPEN DB ERROR', error)
      );
    }).then();
  }
}
