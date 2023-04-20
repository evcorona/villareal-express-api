const cors = require('cors')
const express = require('express')

const authRouter = require('../src/routes/auth')
const houseRouter = require('../src/routes/house')
const expenseRouter = require('../src/routes/expense')
const incomeRouter = require('../src/routes/income')

// Server configuration
const server = express()

// Server tools
server.use(cors())
server.use(express.json())

// Server routes
server.use('/auth', authRouter)
server.use('/house', houseRouter)
server.use('/expense', expenseRouter)
server.use('/income', incomeRouter)

// Server response
server.get('/', (request, response) => {
  response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  response.json({ success: true, message: '🚀 Villarreal-express.api' })
})

module.exports = server
