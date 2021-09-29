const express = require('express')
const router = express.Router()
const { cancelationCreate } = require('../controllers/queries')

router.post('/create/cancellation', cancelationCreate);

module.exports = router