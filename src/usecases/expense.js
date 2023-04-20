const Expense = require('./../models/Expense')

async function addExpense(userId, expenseData) {
  return await Expense.create({ ...expenseData, treasurerID: userId })
}

async function getExpenses() {
  return await Expense.find()
}

module.exports = { addExpense, getExpenses }
