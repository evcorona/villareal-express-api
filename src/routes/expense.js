const express = require('express')
const expense = require('./../usecases/expense')
const authMiddleware = require('./../middlewares/auth')

const router = express.Router()

router.get('/', authMiddleware, async (req, res) => {
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

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newExpense = await expense.addExpense(req.body)

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
