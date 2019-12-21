'use strict'

const request = require('supertest')
const assert = require('assert')

const db = require('../../singletons/database')()
const buildSchemas = require('../../inits/buildSchemas')
const { app } = require('../../app')

describe('raceTests: /routes/rides', () => {
  beforeEach(() => {
    buildSchemas()
    db.run('DELETE FROM Rides')
  })

  describe('POST /:id', () => {
    it('should return the matched riderName', async () => {
      const promises = []
      for (let i = 0; i < 450; i++) {
        promises.push(
          new Promise((resolve, reject) => {
            const index = i
            request(app)
              .post('/rides')
              .set('Content-Type', 'application/json')
              .send(
                JSON.stringify({
                  start_lat: 0,
                  start_long: 0,
                  end_lat: 1,
                  end_long: 1,
                  rider_name: 'TEST RIDER ' + index,
                  driver_name: 'TEST DRIVER',
                  driver_vehicle: 'TEST VEHICLE'
                })
              )
              .then(resp => {
                if (resp.body.riderName === 'TEST RIDER ' + index) {
                  resolve('match')
                } else {
                  reject(
                    `riderName is ${resp.body.riderName}, while i is ${index}`
                  )
                }
              })
          })
        )
      }

      await Promise.all(promises)

      assert(1, 1)
    })
  })
})
