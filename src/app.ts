import * as express from 'express'
import inits from './inits'

import health from './routes/health'
import rides from './routes/rides'

const app = express()
const port = 8010

inits()

app.use(express.json())

app.use('/health', health)
app.use('/rides', rides)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

export default app