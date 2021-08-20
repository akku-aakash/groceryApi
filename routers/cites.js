const express = require('express')
const router = express.Router()
const { create, getCityById, getcity, cityList } = require('../controllers/cites')

router.post('/create/city', create)
router.get('/city/:cityId', getcity)
router.get('/cities', cityList)

router.param('cityId', getCityById)

module.exports = router;