export enum SqlStatementType {
  create = 'CREATE',
  insert = 'INSERT',
  delete = 'DELETE',
  update = 'UPDATE',
  select = 'SELECT'
}

export interface ISqlStatement {
  type: SqlStatementType;
  statement: (string | string[])[];
}
