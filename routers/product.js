const express = require('express')
const router = express.Router()
const { create, lists, getProductById, singleProduct, prodductByCat } = require('../controllers/product')
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
router.get('/product', lists)
router.get('/product/:productId', singleProduct)
router.get('/productbycat', prodductByCat )

router.param('productId', getProductById);

module.exports = router;