'use strict'

const request = require('supertest')

const { app } = require('../../app')
const buildSchemas = require('../../inits/buildSchemas')

describe('/routes/health', () => {
  before(() => {
    buildSchemas()
  })

  describe('GET /', () => {
    it('should return health', done => {
      request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200, { api: true, database: true }, done)
    })
  })
})
