import { Router } from 'express'

import getLogger from '../singletons/logger'
import DatabaseHelper from '../helpers/DatabaseHelper'

const router = Router()
const logger = getLogger()

/**
 * @api {get} /health Check the health of the system.
 * @apiGroup Health
 *
 * @apiSuccess {Boolean} api This informs whether the API is healthy.
 * @apiSuccess {Boolean} database This informs whether database is healthy.
 */
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

export default router
