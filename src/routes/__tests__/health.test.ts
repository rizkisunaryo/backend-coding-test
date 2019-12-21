import * as request from 'supertest'

import buildSchemas from '../../inits/buildSchemas'
import app from '../../app'

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
