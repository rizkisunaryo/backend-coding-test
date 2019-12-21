import { strictEqual } from 'assert'
import getLogger from '../logger'

const envBackup = { ...process.env }
describe('/singletons/logger', () => {
    after(() => {
        process.env = envBackup
    })

    it('should return existing logger', () => {
        let logger = getLogger()
        logger = getLogger()
        strictEqual(logger.readable, true)
    })
})