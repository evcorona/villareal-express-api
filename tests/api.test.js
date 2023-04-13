/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../src/server')

describe('GET / ', () => {
  test('Check if the server runs successfully', async () => {
    const response = await request(app).get('/')
    expect(response.body.message).toEqual('🚀 Villarreal-express.api')
    expect(response.statusCode).toBe(200)
  })
})
