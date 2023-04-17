/* eslint-disable no-undef */
const mongoose = require('mongoose')
const request = require('supertest')
require('dotenv').config()

const app = require('../src/server')
const { loginAdmin, loginUser } = require('./utils/loginProcess')

const { DB_TEST_URI } = process.env

beforeEach(async () => {
  await mongoose.connect(DB_TEST_URI)
})

afterEach(async () => {
  await mongoose.connection.close()
})

describe('PUSH /house ', () => {
  test('Check if get houses list', async () => {
    const response = await await request(app).get('/house')
    expect(response.body.data).toHaveProperty('houses')
    expect(response.statusCode).toBe(200)
  })

  test('Check if an invalid user cannot add houses', async () => {
    const response = await await request(app).post('/house').send({
      houseNumber: 3,
      street: 'verde',
    })

    expect(response.body.message).toEqual('Token required')
    expect(response.statusCode).toBe(401)
  })

  test('Check if common user cannot add houses', async () => {
    const userToken = await loginUser(app)

    const response = await await request(app)
      .post('/house')
      .set('Authorization', userToken)
      .send({
        houseNumber: 3,
        street: 'verde',
      })

    expect(response.body.message).toContain('Unauthorized')
    expect(response.statusCode).toBe(401)
  })

  test('Check if admin can add houses', async () => {
    const adminToken = await loginAdmin(app)

    const response = await await request(app)
      .post('/house')
      .set('Authorization', adminToken)
      .send({
        houseNumber: 3,
        street: 'verde',
      })

    expect(response.body.message).toContain('House already exists')
    expect(response.statusCode).toBe(400)
  })
})
