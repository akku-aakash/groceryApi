const express = require('express')
const router = express.Router()
const multer = require('multer')
const { create, categoryById, readSingle, list, remove, update } = require('../controllers/category');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/category/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post('/category/create', upload.single('banner'), create);
router.get('/category/:categoryId', readSingle)
router.get('/category', list)
router.delete('/category/:categoryId', remove)
router.put('/category/:categoryId', update)


router.param('categoryId', categoryById);
module.exports = router;