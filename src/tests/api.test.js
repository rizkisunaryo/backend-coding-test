'use strict'

const request = require('supertest')
const assert = require('assert')

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

const app = require('../app')(db)
const buildSchemas = require('../schemas')

describe('API tests', () => {
  beforeEach(done => {
    db.serialize(err => {
      if (err) {
        return done(err)
      }

      buildSchemas(db)
      db.run(`DELETE FROM Rides`)

      done()
    })
  })

  describe('GET /health', () => {
    it('should return health', done => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done)
    })
  })

  describe('GET /rides', () => {
    it('should return 410 if no rides', done => {
      request(app)
        .get('/rides')
        .expect(410, done)
    })

    it('should return inserted rides', async () => {
      await request(app)
        .post('/rides')
        .set('Content-Type', 'application/json')
        .send(
          JSON.stringify({
            start_lat: 0,
            start_long: 0,
            end_lat: 1,
            end_long: 1,
            rider_name: 'TEST RIDER',
            driver_name: 'TEST DRIVER',
            driver_vehicle: 'TEST VEHICLE'
          })
        )
      const rides = await request(app).get('/rides')
      assert.equal(rides.body.length, 1)
    })
  })

  describe('GET /rides/:id', () => {
    it('should return 410 if rides id not found', done => {
      request(app)
        .get('/rides/test')
        .expect('Content-Type', /application\/json/)
        .expect(410, done)
    })

    it('should return inserted ride', async () => {
      const insertedRide = await request(app)
        .post('/rides')
        .set('Content-Type', 'application/json')
        .send(
          JSON.stringify({
            start_lat: 0,
            start_long: 0,
            end_lat: 1,
            end_long: 1,
            rider_name: 'TEST RIDER 2',
            driver_name: 'TEST DRIVER 2',
            driver_vehicle: 'TEST VEHICLE 2'
          })
        )
      const rides = await request(app).get(`/rides/${insertedRide.body.rideID}`)
      assert.equal(rides.body.driverName, 'TEST DRIVER 2')
    })
  })

  describe('POST /rides/:id', () => {
    it('should return 400 if start_lat is not number', done => {
      request(app)
        .post('/rides')
        .set('Content-Type', 'application/json')
        .send(
          JSON.stringify({
            start_lat: 'LAT TEST',
            start_long: 0,
            end_lat: 1,
            end_long: 1,
            rider_name: 'TEST RIDER 2',
            driver_name: 'TEST DRIVER 2',
            driver_vehicle: 'TEST VEHICLE 2'
          })
        )
        .expect(400, done)
    })

    it('should return 400 if start_long is not number', done => {
      request(app)
        .post('/rides')
        .set('Content-Type', 'application/json')
        .send(
          JSON.stringify({
            start_lat: 0,
            start_long: 'LONG TEST',
            end_lat: 1,
            end_long: 1,
            rider_name: 'TEST RIDER 2',
            driver_name: 'TEST DRIVER 2',
            driver_vehicle: 'TEST VEHICLE 2'
          })
        )
        .expect(400, done)
    })

    it('should return 400 if end_lat is not number', done => {
      request(app)
        .post('/rides')
        .set('Content-Type', 'application/json')
        .send(
          JSON.stringify({
            start_lat: 0,
            start_long: 0,
            end_lat: 'END LAT',
            end_long: 1,
            rider_name: 'TEST RIDER 2',
            driver_name: 'TEST DRIVER 2',
            driver_vehicle: 'TEST VEHICLE 2'
          })
        )
        .expect(400, done)
    })

    it('should return 400 if end_long is not number', done => {
      request(app)
        .post('/rides')
        .set('Content-Type', 'application/json')
        .send(
          JSON.stringify({
            start_lat: 0,
            start_long: 0,
            end_lat: 1,
            end_long: 'END LONG',
            rider_name: 'TEST RIDER 2',
            driver_name: 'TEST DRIVER 2',
            driver_vehicle: 'TEST VEHICLE 2'
          })
        )
        .expect(400, done)
    })

    it('should return 400 if rider_name is not string', done => {
      request(app)
        .post('/rides')
        .set('Content-Type', 'application/json')
        .send(
          JSON.stringify({
            start_lat: 0,
            start_long: 0,
            end_lat: 1,
            end_long: 1,
            rider_name: 999,
            driver_name: 'TEST DRIVER 2',
            driver_vehicle: 'TEST VEHICLE 2'
          })
        )
        .expect(400, done)
    })

    it('should return 400 if driver_name is not string', done => {
      request(app)
        .post('/rides')
        .set('Content-Type', 'application/json')
        .send(
          JSON.stringify({
            start_lat: 0,
            start_long: 0,
            end_lat: 1,
            end_long: 1,
            rider_name: 'TEST RIDER 2',
            driver_name: 999,
            driver_vehicle: 'TEST VEHICLE 2'
          })
        )
        .expect(400, done)
    })

    it('should return 400 if driver_vehicle is not string', done => {
      request(app)
        .post('/rides')
        .set('Content-Type', 'application/json')
        .send(
          JSON.stringify({
            start_lat: 0,
            start_long: 0,
            end_lat: 1,
            end_long: 1,
            rider_name: 'TEST RIDER 2',
            driver_name: 'TEST DRIVER 2',
            driver_vehicle: 999
          })
        )
        .expect(400, done)
    })
  })
})
