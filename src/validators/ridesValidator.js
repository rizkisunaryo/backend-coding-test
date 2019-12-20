module.exports = {
  validatePost: (
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    riderName,
    driverName,
    driverVehicle
  ) => {
    if (
      startLatitude < -90 ||
      startLatitude > 90 ||
      isNaN(startLatitude) ||
      startLongitude < -180 ||
      startLongitude > 180 ||
      isNaN(startLongitude)
    ) {
      return {
        status: 400,
        error_code: 'VALIDATION_ERROR',
        message:
          'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
      }
    }

    if (
      endLatitude < -90 ||
      endLatitude > 90 ||
      isNaN(endLatitude) ||
      endLongitude < -180 ||
      endLongitude > 180 ||
      isNaN(endLongitude)
    ) {
      return {
        status: 400,
        error_code: 'VALIDATION_ERROR',
        message:
          'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
      }
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
      return {
        status: 400,
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string'
      }
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      return {
        status: 400,
        error_code: 'VALIDATION_ERROR',
        message: 'Driver name must be a non empty string'
      }
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      return {
        status: 400,
        error_code: 'VALIDATION_ERROR',
        message: 'Vehicle must be a non empty string'
      }
    }

    return null
  }
}
