const assert = require('assert')
const {numberize} = require('../NumberHelper')

describe('/helpers/NumberHelper', () => {
    it('should return the input0', () => {
        assert(numberize(10, 1), 10)
    })

    it('should return default value if number is 0', () => {
        assert(numberize(0, 1), 1)
    })

    it('should return default value if input is string', () => {
        assert(numberize('I am a string', 1), 1)
    })

    it('should return default value if input is null', () => {
        assert(numberize(null, 1), 1)
    })

    it('should return default value if input is undefined', () => {
        assert(numberize(undefined, 1), 1)
    })
})