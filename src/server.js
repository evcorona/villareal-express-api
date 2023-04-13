const cors = require('cors')
const express = require('express')

const authRouter = require('./routes/auth')
const expenseRouter = require('./routes/expense')
const houseRouter = require('./routes/house')
const incomeRouter = require('./routes/income')

// Server configuration
const server = express()

// Server tools
server.use(cors())
server.use(express.json())

// Server routes
server.use('/auth', authRouter)
server.use('/expense', expenseRouter)
server.use('/house', houseRouter)
server.use('/income', incomeRouter)

// Server response
server.get('/', (request, response) => {
  response.json({ success: true, message: 'express.api' })
})

module.exports = server
