const express = require('express')
const router = express.Router()
const { create, getCityById, getcity, 
    cityList, updateCity, remove } = require('../controllers/cites')

router.post('/create/city', create)
router.get('/city/:cityId', getcity)
router.get('/cities', cityList)
router.put('/update/city/:cityId', updateCity)
router.delete('/city/:cityId', remove)

router.param('cityId', getCityById)

module.exports = router;