const express = require('express')
const router = express.Router()
const { queriesCreate, getreport, reportById, updateQueries } = require('../controllers/queries')

router.post('/create/report', queriesCreate)
router.get('/get/report' , getreport)
router.put('/update/status/query/:reqportId', updateQueries)

router.param('reqportId' , reportById)
module.exports = router