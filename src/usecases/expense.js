const Expense = require('./../models/Expense')
const userData = require('../utils/userData')

async function addExpense(expenseData) {
  return await Expense.create({ ...expenseData, treasurerID: userData.id })
}

async function getExpenses() {
  return await Expense.find()
}

module.exports = { addExpense, getExpenses }
