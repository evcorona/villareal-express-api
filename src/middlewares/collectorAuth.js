const userData = require('../utils/userData')

function collectorAuth(request, response, next) {
  try {
    const user = userData(request.headers.authorization)

    if (user.role !== 'collector') throw new Error('Unauthorized')

    next()
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = collectorAuth
