const Expense = require('./../models/Income')

async function addExpense(expenseData) {
  const newExpense = await Expense.create(expenseData)

  return newExpense
}

async function getExpenses() {
  return await Expense.find()
}

module.exports = { addExpense, getExpenses }
