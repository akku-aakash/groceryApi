const express = require('express')
const router = express.Router()
const { userById, read } = require('../controllers/user')
const { isAuth, requireSignin } = require('../controllers/auth')

router.get('/user/:userId', requireSignin, isAuth, read)

router.param('userId', userById)

module.exports = router;