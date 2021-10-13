const express = require('express')
const router = express.Router()
const { cancelationCreate, getCanellation, canellationById, updateCancellation } = require('../controllers/queries')

router.post('/create/cancellation', cancelationCreate);
router.get('/get/cancellation', getCanellation)
router.put('/update/cancellation/status/:cancellationId', updateCancellation)

router.param('cancellationId' , canellationById) 
module.exports = router