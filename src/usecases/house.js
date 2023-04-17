const House = require('./../models/House')

async function addHouse(houseData) {
  const { street, houseNumber } = houseData

  const isRepeated = await House.findOne({ street, houseNumber })
  if (isRepeated) throw new Error('House already exists')

  const newHouse = await House.create(houseData)

  return newHouse
}

async function getHouses() {
  return await House.find()
}

module.exports = { addHouse, getHouses }
