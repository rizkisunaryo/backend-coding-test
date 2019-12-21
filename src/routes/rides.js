const router = require('express').Router()

const DatabaseHelper = require('../helpers/DatabaseHelper')
const logger = require('../singletons/logger')()
const ridesValidator = require('../validators/ridesValidator')
const { numberize } = require('../helpers/NumberHelper')

/**
 * @api {post} /rides Add new ride
 * @apiGroup Rides
 *
 * @apiParam {Number} start_lat Start latitude.
 * @apiParam {Number} start_long Start longitude.
 * @apiParam {Number} end_lat End latitude.
 * @apiParam {Number} end_long End longitude.
 * @apiParam {String} rider_name Rider name.
 * @apiParam {String} driver_name Driver name.
 * @apiParam {String} driver_vehicle Driver vehicle.
 *
 * @apiSuccess {Number} rideID ID of inserted.
 * @apiSuccess {Number} start_lat Start latitude.
 * @apiSuccess {Number} start_long Start longitude.
 * @apiSuccess {Number} end_lat End latitude.
 * @apiSuccess {Number} end_long End longitude.
 * @apiSuccess {String} rider_name Rider name.
 * @apiSuccess {String} driver_name Driver name.
 * @apiSuccess {String} driver_vehicle Driver vehicle.
 */
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
    return
  }

  var values = [
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    riderName,
    driverName,
    driverVehicle
  ]

  try {
    const result = await DatabaseHelper.run(
      'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values
    )

    const [rows] = await DatabaseHelper.all(
      'SELECT * FROM Rides WHERE rideID = ?',
      result[1].lastID
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

/**
 * @api {get} /rides Get rides data
 * @apiGroup Rides
 *
 * @apiParam {Number} page Page of data pagination.
 * @apiParam {Number} size Number of rides returned.
 *
 * @apiSuccess {Object[]} - List of rides.
 * @apiSuccess {Number} -.rideID ID of inserted.
 * @apiSuccess {Number} -.start_lat Start latitude.
 * @apiSuccess {Number} -.start_long Start longitude.
 * @apiSuccess {Number} -.end_lat End latitude.
 * @apiSuccess {Number} -.end_long End longitude.
 * @apiSuccess {String} -.rider_name Rider name.
 * @apiSuccess {String} -.driver_name Driver name.
 * @apiSuccess {String} -.driver_vehicle Driver vehicle.
 */
router.get('/', async (req, res) => {
  try {
    const page = numberize(req.query.page, 1)
    const size = numberize(req.query.size, 10)

    const [rows] = await DatabaseHelper.all('SELECT * FROM Rides LIMIT ?, ?', [
      (page - 1) * size,
      size
    ])
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

/**
 * @api {get} /rides/:id Get the ride based on id
 * @apiGroup Rides
 *
 * @apiParam {Number} id ID of the ride.
 *
 * @apiSuccess {Number} rideID ID of inserted.
 * @apiSuccess {Number} start_lat Start latitude.
 * @apiSuccess {Number} start_long Start longitude.
 * @apiSuccess {Number} end_lat End latitude.
 * @apiSuccess {Number} end_long End longitude.
 * @apiSuccess {String} rider_name Rider name.
 * @apiSuccess {String} driver_name Driver name.
 * @apiSuccess {String} driver_vehicle Driver vehicle.
 */
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await DatabaseHelper.all(
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
    logger.error(error.toString())
    return res.status(500).send({
      error_code: 'SERVER_ERROR',
      message: 'Unknown error'
    })
  }
})

module.exports = router
