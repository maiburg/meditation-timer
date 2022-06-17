import { Injectable } from '@angular/core';

import { ISqlStatement, SqlStatementType, Tables } from '@app/core/models';
import { Timer } from '@core/models/domain';

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

  getDBConnection(): Promise<any> {
    return new Sqlite(this.dbName);
  }

  closeDBConnection(): void {
    this.getDBConnection().then(db => db.close());
  }

  deleteDB(): void {
    Sqlite.deleteDatabase(this.dbName);
  }

  initDB() {
    if (!this.dbExists) {
      this.getDBConnection().then(
        db =>
          this.sqlStatements.forEach(item =>
            db.execSQL(...item.statement).then(
              id => console.log(item.type, id || 'DB'),
              error => console.log(item.type, error)
            )
          ),
        error => console.log('OPEN DB ERROR', error)
      );
    }
  }

  fetch(table: Tables, id?: number): Promise<Timer[]> {
    let statement = `SELECT * FROM ${table}`;

    if (id) {
      statement += ` WHERE id=${id}`;
    }

    return new Promise<Timer[]>((resolve, reject) =>
      this.getDBConnection().then(
        db =>
          db.all(statement).then(
            rows => resolve(rows.map(row => this.getObjectFromRow(table, row))),
            err => console.log(SqlStatementType.select, err)
          ),
        error => console.log('OPEN DB ERROR', error)
      )
    ).then();
  }

  insert(table: Tables) {
    const statement = [`INSERT INTO ${table} (description) VALUES (?)`, ['Ananas']];

    return new Promise<Object>((resolve, reject) =>
      this.getDBConnection().then(
        db => {
          db.execSQL(...statement).then(
            id => resolve(id),
            err => console.log(SqlStatementType.insert, err)
          );
        },
        error => console.log('OPEN DB ERROR', error)
      )
    ).then();
  }

  delete(table: Tables, id?: number) {
    let statement = `DELETE FROM ${table}`;

    if (id) {
      statement += ` DELETE FROM ${table} WHERE id=${id}`;
    }

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

  get dbExists(): boolean {
    return Sqlite.exists(this.dbName);
  }

  getObjectFromRow(table: Tables, row: any[]): Timer {
    // TODO: Write test
    let timer: Timer;
    let id: number, description: string;
    [id, description] = row;

    timer = { id, description };

    return timer;
  }
}
