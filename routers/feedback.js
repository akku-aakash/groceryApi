const express = require('express')
const router = express.Router()
const { userById } = require('../controllers/user')

router.get("/feedback", (req, res) => {

});


router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router