const express = require('express')
const router = express.Router()
const { create } = require('../controllers/product')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/product/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post('/product/create', upload.array('imgcollection', 8), create);

module.exports = router;