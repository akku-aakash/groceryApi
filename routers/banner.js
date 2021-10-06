const express = require("express");
const routes = express.Router()
const { createBanner, fetchBanner } = require('../controllers/banner')
const multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/banner/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })


routes.post('/create/banner', upload.single('banner'), createBanner)
routes.get('/allbanner', fetchBanner)

module.exports = routes