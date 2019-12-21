import getDb from '../singletons/database'
import { Statement, RunResult } from 'sqlite3'

interface DatabaseReturnStatementType extends Array<any[]|Statement>{0:any[]; 1:Statement}
interface DatabaseReturnResultType extends Array<any[]|RunResult>{0:any[]; 1:RunResult}

const callback = (resolve, reject) => function (err, rows) {
  if (err) {
    reject(err)
  } else {
    resolve([rows, this])
  }
}

export default {
  all: (sql, params?): Promise<DatabaseReturnStatementType> =>
    new Promise((resolve, reject) =>
      getDb().all(sql, params, callback(resolve, reject))
    ),
  run: (sql, params?): Promise<DatabaseReturnResultType> =>
    new Promise((resolve, reject) =>
      getDb().run(sql, params, callback(resolve, reject))
    )
}
