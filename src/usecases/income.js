const Income = require('./../models/Income')

async function addIncome(incomeData) {
  const newIncome = await Income.create(incomeData)

  return newIncome
}

async function getIncomes() {
  return await Income.find().populate('houses', 'users')
}

module.exports = { addIncome, getIncomes }
