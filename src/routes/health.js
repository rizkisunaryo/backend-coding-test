const router = require('express').Router()

const logger = require('../singletons/logger')()
const DatabaseHelper = require('../helpers/DatabaseHelper')

router.get('/', async (req, res) => {
  const healthy = {
    api: true,
    database: true
  }

  try {
    await DatabaseHelper.all('SELECT * FROM Rides LIMIT 1')
  } catch (error) {
    logger.error(error.toString())
    healthy.database = false
  }

  res.json(healthy)
})

module.exports = router
