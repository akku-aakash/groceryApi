const express = require('express')
const router = express.Router()
const {create, subsById, list, editsub} = require('../controllers/subscribe')

router.post('/subscription/create', create)
router.get('/subscription/list', list)
router.put('/subscription/edit/:subsId', editsub)

router.param('subsId', subsById)
module.exports = router