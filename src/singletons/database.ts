// const sqlite3 = require('sqlite3').verbose()
import { verbose, Database } from 'sqlite3'

let db: Database
export default (): Database => {
  if (db) return db

  const sqlite3 = verbose()
  db = new sqlite3.Database('data')
  db.serialize()

  return db
}
