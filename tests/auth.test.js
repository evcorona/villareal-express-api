/* eslint-disable no-undef */
const mongoose = require('mongoose')
const request = require('supertest')
require('dotenv').config()

const app = require('../api/server')
const { loginAdmin, loginUser } = require('./utils/loginProcess')

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

  test('Check if an invalid user can not log in', async () => {
    const response = await await request(app).post('/auth/login').send({
      email: 'wrong-email@test.com',
      password: 'wrong-password',
    })

    expect(response.body.message).toEqual('Invalid credentials')
    expect(response.statusCode).toBe(401)
  })

  test('Check signup process', async () => {
    const adminToken = await loginAdmin(app)

    const response = await await request(app)
      .post('/auth/signup')
      .set('Authorization', adminToken)
      .send({
        email: TEST_USER,
        password: TEST_PASSWORD,
        role: 'collector',
        firstName: 'Test',
        lastName: 'Testing',
      })

    expect(response.body.message).toContain('duplicate key error')
    expect(response.statusCode).toBe(400)
  })

  test('Check if signup is restricted for common user', async () => {
    const userToken = await loginUser(app)

    const response = await await request(app)
      .post('/auth/signup')
      .set('Authorization', userToken)
      .send({
        email: TEST_USER,
        password: TEST_PASSWORD,
        role: 'collector',
        firstName: 'Test',
        lastName: 'Testing',
      })

    expect(response.body.message).toContain('Unauthorized')
    expect(response.statusCode).toBe(401)
  })
})
