const db = require('../singletons/database')()

const callback = (resolve, reject) => (err, rows) => {
  if (err) {
    reject(err)
  } else {
    resolve(rows)
  }
}

module.exports = {
  all: (sql, params) =>
    new Promise((resolve, reject) =>
      db.all(sql, params, callback(resolve, reject))
    ),
  run: (sql, params) =>
    new Promise((resolve, reject) =>
      db.run(sql, params, callback(resolve, reject))
    )
}
