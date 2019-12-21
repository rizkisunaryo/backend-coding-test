import {strictEqual} from 'assert'
import {numberize} from '../NumberHelper'

describe('/helpers/NumberHelper', () => {
    it('should return the input0', () => {
        strictEqual(numberize(10, 1), 10)
    })

    it('should return default value if number is 0', () => {
        strictEqual(numberize(0, 1), 1)
    })

    it('should return default value if input is string', () => {
        strictEqual(numberize('I am a string', 1), 1)
    })

    it('should return default value if input is null', () => {
        strictEqual(numberize(null, 1), 1)
    })

    it('should return default value if input is undefined', () => {
        strictEqual(numberize(undefined, 1), 1)
    })
})