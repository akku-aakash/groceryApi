const express = require('express')
const router = express.Router()

const { generatePay, read, addslot,
    updateSlot, findbysId, generateLink } = require('../controllers/Razorpay');

router.post('/payment/details', generatePay);
router.post('/payment/link/generate', generateLink);
router.post('/add/timeslot', addslot)
router.put('/update/timeslot/:slotId', updateSlot)
router.get('/gettimeslot', read)
router.param('slotId', findbysId)
module.exports = router