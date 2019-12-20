const express = require('express')
const app = express()
const port = 8010

const inits = require('./inits')

// const start = async () => {
    inits()

    app.use(express.json())

    app.use('/health', require('./routes/health'))
    app.use('/rides', require('./routes/rides'))

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// }

// start()

module.exports = {
    app
}