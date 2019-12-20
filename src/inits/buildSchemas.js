'use strict'

const db = require('../singletons/database')()

module.exports = () => {
  const createRideTableSchema = `
        CREATE TABLE IF NOT EXISTS Rides
        (
        rideID TEXT PRIMARY KEY,
        startLat DECIMAL NOT NULL,
        startLong DECIMAL NOT NULL,
        endLat DECIMAL NOT NULL,
        endLong DECIMAL NOT NULL,
        riderName TEXT NOT NULL,
        driverName TEXT NOT NULL,
        driverVehicle TEXT NOT NULL,
        created DATETIME default CURRENT_TIMESTAMP
        )
    `

  db.run(createRideTableSchema)
}
