const assert = require('assert')

const envBackup = {...process.env}
describe('/singletons/logger', () => {
    after(() => {
        process.env = envBackup
    })

    it('should return existing logger', () => {
        let logger = require('../logger')()
        logger = require('../logger')()
        assert(logger.readable, true)
    })
})