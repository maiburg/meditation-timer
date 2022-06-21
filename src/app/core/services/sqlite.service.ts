import { Injectable } from '@angular/core';

import { ISqlStatement, SqlStatementType, Tables } from '@app/core/models';
import { TimerPresetting } from '@core/models/domain';

let Sqlite = require('nativescript-sqlite');

@Injectable()
export class SqliteService {
  dbName = 'mt.db3';
  sqlStatements: ISqlStatement[] = [
    {
      type: SqlStatementType.create,
      statement: [
        `CREATE TABLE IF NOT EXISTS ${Tables.timerPresetting} (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT)`
      ]
    },
    {
      type: SqlStatementType.insert,
      statement: [`INSERT INTO ${Tables.timerPresetting} (description) VALUES (?)`, ['Dies']]
    },
    {
      type: SqlStatementType.insert,
      statement: [`INSERT INTO ${Tables.timerPresetting} (description) VALUES (?)`, ['Das']]
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

  initDB(): void {
    if (!this.dbExists) {
      this.sqlStatements.forEach(item => this.execSQL(item.statement));
    }
  }

  fetch(table: Tables, id?: number): Promise<TimerPresetting[]> {
    let statement = `SELECT * FROM ${table}` + `${id ? ' WHERE id=' + id : ''}`;

    return new Promise<TimerPresetting[]>(resolve =>
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

  insert(table: Tables, description: string): void {
    this.execSQL([`INSERT INTO ${table} (description) VALUES (?)`, [description]]);
  }

  update(table: Tables, columns: TimerPresetting): void {
    this.execSQL([`UPDATE ${table} SET description = '${columns.description}' WHERE id=${columns.id}`]);
  }

  delete(table: Tables, id?: number) {
    this.execSQL([`DELETE FROM ${table}` + `${id ? ' WHERE id=' + id : ''}`]);
  }

  private execSQL(statement: (string | string[])[]): void {
    this.getDBConnection().then(
      db => db.execSQL(...statement),
      error => console.log('OPEN DB ERROR', error)
    );
  }

  private getObjectFromRow(table: Tables, row: any[]): TimerPresetting {
    if (table === Tables.timerPresetting) {
      let timer: TimerPresetting;
    }

    let id: number, description: string;
    [id, description] = row;

    return { id, description };
  }

  get dbExists(): boolean {
    return Sqlite.exists(this.dbName);
  }
}
