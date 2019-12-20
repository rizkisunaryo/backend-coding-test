const sqlite3 = require('sqlite3').verbose()

let db
module.exports = () => {
    if (db) return db

    db = new sqlite3.Database('data')
    db.serialize()
    
    return db
}