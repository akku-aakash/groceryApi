const express = require('express')
const router = express.Router()
const { queriesCreate } = require('../controllers/queries')

router.post('/create/report', queriesCreate)

module.exports = router