const express = require('express')
const router = express.Router()
const multer = require('multer')
const { create, list, lists, remove, getByID,
    readSingle, updatenow, updateImage
} = require('../controllers/subcategory');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/subCategory/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })

router.get('/subcategorys/:subcatId', readSingle)
router.post('/subcategory/create', upload.single('banner'), create);
router.get('/subcategory', list)
router.get('/admin/subcategory', lists)
router.put('/update/subcategory/:subcatId', updatenow)
router.delete('/delete/subcategory/:subcatId', remove)
router.put('/update/image/subcategory/:subcatId', upload.single('banner'), updateImage)

router.param('subcatId', getByID)
module.exports = router;