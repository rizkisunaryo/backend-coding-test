import { createLogger, format, transports, Logger } from 'winston'

let logger: Logger
export default () => {
  if (logger) return logger

  logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' })
    ]
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new transports.Console({
        format: format.simple()
      })
    )
  }

  return logger
}
