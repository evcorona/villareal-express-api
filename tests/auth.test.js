/* eslint-disable no-undef */
const mongoose = require('mongoose')
const request = require('supertest')
require('dotenv').config()

const app = require('../src/server')

const { DB_TEST_URI, TEST_USER, TEST_PASSWORD } = process.env

beforeEach(async () => {
  await mongoose.connect(DB_TEST_URI)
})

afterEach(async () => {
  await mongoose.connection.close()
})

describe('PUSH /auth ', () => {
  test('Check if test user can login', async () => {
    const response = await await request(app).post('/auth/login').send({
      email: TEST_USER,
      password: TEST_PASSWORD,
    })
    expect(response.body.data).toHaveProperty('token')
    expect(response.statusCode).toBe(200)
  })

  test('Check if a invalid user can not login', async () => {
    const response = await await request(app).post('/auth/login').send({
      email: 'wrong-email@test.com',
      password: 'wrong-password',
    })

    expect(response.body.message).toEqual('Invalid credentials')
    expect(response.statusCode).toBe(401)
  })
})
