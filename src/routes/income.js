const express = require('express')
const income = require('./../usecases/income')
const authMiddleware = require('./../middlewares/auth')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const incomes = await income.getIncomes()

    res.json({
      success: true,
      data: { incomes },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newIncome = await income.addIncome(req.body)

    res.json({
      success: true,
      data: { newIncome },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

module.exports = router
