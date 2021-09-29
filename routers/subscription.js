const express = require('express')
const router = express.Router()
const { subsById, create, listByUser } = require('../controllers/subscription')

router.post('/subs/create', create)
router.get('/subs/list', listByUser)

router.param('subsId', subsById)
module.exports = router