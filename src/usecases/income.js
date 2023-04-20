const Income = require('./../models/Income')
const getDaysInMonth = require('date-fns/getDaysInMonth')
const addDays = require('date-fns/addDays')

async function addIncome(userId, incomeData) {
  const newIncome = await Income.create({
    ...incomeData,
    collectorId: userId,
  })

  return newIncome
}

async function getIncomes() {
  return await Income.find()
    .populate('houseId')
    .populate('collectorId')
    .populate('treasurerId')
}

async function getIncomesByHouseId(query) {
  const date = new Date(query.date)
  const endOfMonth = addDays(date, getDaysInMonth(date) - 1)

  const incomesFiltered = Income.find({
    houseId: query.id,
    createdAt: {
      $gte: date,
      $lt: endOfMonth,
    },
  })
    .populate('houseId')
    .populate('collectorId', 'firstName lastName')
    .populate('treasurerId')

  return incomesFiltered
}

module.exports = { addIncome, getIncomes, getIncomesByHouseId }
