const router = require('express').Router()
const uuidV4 = require('uuid/v4')

const db = require('../singletons/database')()
const DatabaseHelper = require('../helpers/DatabaseHelper')
const logger = require('../singletons/logger')()
const ridesValidator = require('../validators/ridesValidator')

router.post('/', async (req, res) => {
  const startLatitude = Number(req.body.start_lat)
  const startLongitude = Number(req.body.start_long)
  const endLatitude = Number(req.body.end_lat)
  const endLongitude = Number(req.body.end_long)
  const riderName = req.body.rider_name
  const driverName = req.body.driver_name
  const driverVehicle = req.body.driver_vehicle

  const notValidReturn = ridesValidator.validatePost(
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    riderName,
    driverName,
    driverVehicle
  )
  if (notValidReturn) {
    const { error_code, message } = notValidReturn
    res.status(notValidReturn.status).send({ error_code, message })
  }

  const id = uuidV4()
    .split('-')
    .join('')
  var values = [
    id,
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    riderName,
    driverName,
    driverVehicle
  ]

  try {
    await DatabaseHelper.run(
      'INSERT INTO Rides(rideID, startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      values
    )
    const rows = await DatabaseHelper.all(
      'SELECT * FROM Rides WHERE rideID = ?',
      id
    )
    res.send(rows[0])
  } catch (error) {
    logger.error(error.toString())

    return res.send({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error'
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const rows = await DatabaseHelper.all('SELECT * FROM Rides')
    if (rows.length === 0) {
      return res.status(410).send({
        error_code: 'RIDES_NOT_FOUND_ERROR',
        message: 'Could not find any rides'
      })
    }

    res.send(rows)
  } catch (error) {
    logger.error(error.toString())
    return res.send({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error'
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const rows = await DatabaseHelper.all(
      'SELECT * FROM Rides WHERE rideID=?',
      req.params.id
    )
    if (rows.length === 0) {
      return res.status(410).send({
        error_code: 'RIDES_NOT_FOUND_ERROR',
        message: 'Could not find any rides'
      })
    }

    res.send(rows[0])
  } catch (error) {
    logger.error(err.toString())
    return res.status(500).send({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error'
    })
  }
})

module.exports = router
