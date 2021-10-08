const express = require("express");
const routes = express.Router()
const { createBanner, fetchBanner, deleteBanner, bannerById, singleBanner, updateBanner, updateImage } = require('../controllers/banner')
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
routes.get('/banner/:bannerId', singleBanner )
routes.put('/update/image/:bannerId', upload.single('banner'), updateImage)
routes.put('/update/banner/:bannerId', updateBanner)
routes.delete('/delete/banner/:bannerId' , deleteBanner)

routes.param('bannerId', bannerById)

module.exports = routes