const express = require('express')
const router = express.Router()

const auth = require('./../middlewares/auth')
const treasurerAuth = require('./../middlewares/treasurerAuth.js')
const expense = require('./../usecases/expense')
const userData = require('../utils/userData')

router.get('/', auth, async (req, res) => {
  try {
    const expenses = await expense.getExpenses()

    res.json({
      success: true,
      data: { expenses },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.post('/', auth, treasurerAuth, async (req, res) => {
  try {
    const { id } = userData(req.headers.authorization)
    const newExpense = await expense.addExpense(id, req.body)

    res.json({
      success: true,
      data: { newExpense },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

module.exports = router
