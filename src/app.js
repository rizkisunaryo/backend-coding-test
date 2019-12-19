'use strict'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

module.exports = db => {
  app.get('/health', (req, res) => res.send('Healthy'))

  app.post('/rides', jsonParser, (req, res) => {
    const startLatitude = Number(req.body.start_lat)
    const startLongitude = Number(req.body.start_long)
    const endLatitude = Number(req.body.end_lat)
    const endLongitude = Number(req.body.end_long)
    const riderName = req.body.rider_name
    const driverName = req.body.driver_name
    const driverVehicle = req.body.driver_vehicle

    if (
      startLatitude < -90 ||
      startLatitude > 90 ||
      isNaN(startLatitude) ||
      startLongitude < -180 ||
      startLongitude > 180 ||
      isNaN(startLongitude)
    ) {
      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message:
          'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
      })
    }

    if (
      endLatitude < -90 ||
      endLatitude > 90 ||
      isNaN(endLatitude) ||
      endLongitude < -180 ||
      endLongitude > 180 ||
      isNaN(endLongitude)
    ) {
      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message:
          'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
      })
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string'
      })
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message: 'Driver name must be a non empty string'
      })
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      return res.status(400).send({
        error_code: 'VALIDATION_ERROR',
        message: 'Vehicle must be a non empty string'
      })
    }

    var values = [
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude,
      req.body.rider_name,
      req.body.driver_name,
      req.body.driver_vehicle
    ]

    const result = db.run(
      'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values,
      function (err) {
        /* istanbul ignore if */
        if (err) {
          return res.send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error'
          })
        }

        db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (
          err,
          rows
        ) {
          /* istanbul ignore if */
          if (err) {
            return res.send({
              error_code: 'SERVER_ERROR',
              message: 'Unknown error'
            })
          }

          res.send(rows[0])
        })
      }
    )
  })

  app.get('/rides', (req, res) => {
    db.all('SELECT * FROM Rides', function (err, rows) {
      /* istanbul ignore if */
      if (err) {
        return res.send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error'
        })
      }

      if (rows.length === 0) {
        return res.status(410).send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides'
        })
      }

      res.send(rows)
    })
  })

  app.get('/rides/:id', (req, res) => {
    const sql = `SELECT * FROM Rides WHERE rideID='${req.params.id}'`
    db.all(sql, function (err, rows) {
      /* istanbul ignore if */
      if (err) {
        return res.status(500).send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error'
        })
      }

      if (rows.length === 0) {
        return res.status(410).send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides'
        })
      }

      res.send(rows[0])
    })
  })

  return app
}
