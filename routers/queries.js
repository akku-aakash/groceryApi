const express = require('express')
const router = express.Router()
const { queriesCreate, getreport, reportById } = require('../controllers/queries')

router.post('/create/report', queriesCreate)
router.get('/get/report' , getreport)

router.param('reqportId' , reportById)
module.exports = router