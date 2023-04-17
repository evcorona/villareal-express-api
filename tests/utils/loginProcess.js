/* eslint-disable no-undef */

const request = require('supertest')
require('dotenv').config()

const { ADMIN_USER, ADMIN_PASSWORD, TEST_USER, TEST_PASSWORD } = process.env

async function loginAdmin(app) {
  const response = await request(app).post('/auth/login').send({
    email: ADMIN_USER,
    password: ADMIN_PASSWORD,
  })
  expect(response.body.data).toHaveProperty('token')
  expect(response.statusCode).toBe(200)

  return response.body.data.token
}

async function loginUser(app) {
  const response = await request(app).post('/auth/login').send({
    email: TEST_USER,
    password: TEST_PASSWORD,
  })
  expect(response.body.data).toHaveProperty('token')
  expect(response.statusCode).toBe(200)

  return response.body.data.token
}

module.exports = { loginAdmin, loginUser }
