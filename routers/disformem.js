const express = require('express')
const router = express.Router()
const { create, subsById, list, editsub, getitnow } = require('../controllers/disformem')

router.post('/discountformem/create', create)
router.get('/discountformem/list', list)
router.put('/discountformem/edit/:discountformemId', editsub)
router.get('/discountformem/:discountformemId', getitnow)

router.param('discountformemId', subsById)
module.exports = router