const express = require('express')
const router = express.Router()

const { generatePay } = require('../controllers/Razorpay');

router.post('/payment/details', generatePay);
// router.post('/payment/capture', capturePay)

module.exports = router