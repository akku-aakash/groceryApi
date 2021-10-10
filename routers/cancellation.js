const express = require('express')
const router = express.Router()
const { cancelationCreate, getCanellation, canellationById } = require('../controllers/queries')

router.post('/create/cancellation', cancelationCreate);
router.get('/get/cancellation', getCanellation)

router.param('cancellationId' , canellationById) 
module.exports = router