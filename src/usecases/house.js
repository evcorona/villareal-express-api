const House = require('./../models/Income')

async function addHouse(houseData) {
  const newHouse = await House.create(houseData)

  return newHouse
}

async function getHouses() {
  return await House.find()
}

module.exports = { addHouse, getHouses }
