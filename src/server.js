const cors = require('cors')
const express = require('express')

const authRouter = require('./routes/auth')
const houseRouter = require('./routes/house')

// Server configuration
const server = express()

// Server tools
server.use(cors())
server.use(express.json())

// Server routes
server.use('/auth', authRouter)
server.use('/house', houseRouter)

// Server response
server.get('/', (request, response) => {
  response.json({ success: true, message: '🚀 Villarreal-express.api' })
})

module.exports = server
