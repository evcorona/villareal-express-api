const express = require('express')
const auth = require('./../middlewares/auth')
const adminAuth = require('./../middlewares/adminAuth')
const house = require('./../usecases/house')

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

router.post('/', auth, adminAuth, async (req, res) => {
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
