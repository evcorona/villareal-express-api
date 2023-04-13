const express = require('express')
const house = require('./../usecases/house')
const authMiddleware = require('./../middlewares/auth')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const houses = await house.getHouses()

    res.json({
      success: true,
      data: { houses },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newHouse = await house.addHouse(req.body)

    res.json({
      success: true,
      data: { newHouse },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

module.exports = router
