const cors = require('cors')
const express = require('express')

// Server configuration
const server = express()

// Server tools
server.use(cors())
server.use(express.json())

// Server response
server.get('/', (request, response) => {
  response.json({ success: true, message: 'express.api' })
})

module.exports = server
