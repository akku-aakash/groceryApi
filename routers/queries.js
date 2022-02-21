const express = require('express')
const router = express.Router()
const multer = require('multer')
const { queriesCreate, getreport, reportById, updateQueries,queriesCreatess } = require('../controllers/queries')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/query/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post('/create/report', upload.single('banner'), queriesCreate)
router.post('/create/withoutimg-report', queriesCreatess)
router.get('/get/report', getreport)
router.put('/update/status/query/:reqportId', updateQueries)

router.param('reqportId', reportById)
module.exports = router