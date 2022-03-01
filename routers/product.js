const express = require('express')
const router = express.Router()
const { create, lists, serachprod,
    getProductById, singleProduct, updateImage, deleteImg,
    prodductByCat, remove , updateProduct, prodductByVar } = require('../controllers/product')
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
router.post('/productbycat', prodductByCat )
router.post('/productbyvarient', prodductByVar )
router.put('/product/update/:productId', updateProduct)
router.put('/product/update/img/:productId', upload.single('banner'), updateImage)
router.put('/product/update/del/:productId', deleteImg)
router.delete('/product/delete/:productId', remove)
router.get('/search',  serachprod)

router.param('productId', getProductById);

module.exports = router;