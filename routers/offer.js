const express = require('express')
const router = express.Router()
const { create, list } = require('../controllers/offer');
const multer = require('multer')


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/offer/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post('/offer/create', upload.single('banner'), create);
router.get('/offer', list);

module.exports = router