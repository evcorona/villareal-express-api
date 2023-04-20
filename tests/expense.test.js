/* eslint-disable no-undef */
const mongoose = require('mongoose')
const request = require('supertest')
require('dotenv').config()

const app = require('../api/server')
const { loginUser } = require('./utils/loginProcess')

const { DB_TEST_URI } = process.env

beforeEach(async () => {
  await mongoose.connect(DB_TEST_URI)
})

afterEach(async () => {
  await mongoose.connection.close()
})

describe('PUSH /expense ', () => {
  test('Check if get expenses list', async () => {
    const userToken = await loginUser(app)
    const response = await request(app)
      .get('/expense')
      .set('Authorization', userToken)

    expect(response.body.data).toHaveProperty('expenses')
    expect(response.statusCode).toBe(200)
  })

  test('Check if an invalid user cannot add expenses', async () => {
    const response = await await request(app).post('/expense').send({
      amount: 900,
      concept: 'TESTING',
    })

    expect(response.body.message).toEqual('Token required')
    expect(response.statusCode).toBe(401)
  })

  test('Check if common user cannot add expenses', async () => {
    const userToken = await loginUser(app)

    const response = await await request(app)
      .post('/expense')
      .set('Authorization', userToken)
      .send({
        amount: 900,
        concept: 'TESTING',
      })

    expect(response.body.message).toContain('Unauthorized')
    expect(response.statusCode).toBe(401)
  })
})
