const jwt = require('jsonwebtoken')

function adminAuth(request, response, next) {
  try {
    const token = request.headers.authorization

    const payloadDecoded = jwt.decode(token, process.env.JWT_SECRET)

    if (payloadDecoded.role !== 'admin') throw new Error('Unauthorized')

    next()
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = adminAuth
