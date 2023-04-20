const express = require('express')
const router = express.Router()

const auth = require('./../middlewares/auth')
const collectorAuth = require('./../middlewares/collectorAuth')
const income = require('./../usecases/income')
const userData = require('../utils/userData')

router.get('/', auth, async (req, res) => {
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

router.get('/:id/:date', async (req, res) => {
  try {
    const incomes = await income.getIncomesByHouseId(req.params)

    res.json({
      success: true,
      data: { incomes },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.post('/', auth, collectorAuth, async (req, res) => {
  try {
    const { id } = userData(req.headers.authorization)
    const newIncome = await income.addIncome(id, req.body)

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
