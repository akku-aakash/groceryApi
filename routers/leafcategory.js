const express = require('express')
const router = express.Router()
const multer = require('multer')
const { create, list, lists, remove, getByID,
    readSingle, updateImage, updatenow
} = require('../controllers/leafcategory');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/leafCategory/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })

router.get('/leafcategorys/:leafId', readSingle)
router.post('/leafcategory/create', upload.single('banner'), create);
router.get('/leafcategory', list)
router.get('/admin/leafcategory', lists)
router.put('/update/leafcategory/:leafId', updatenow)
router.delete('/delete/leafcategory/:leafId', remove)
router.put('/update/image/leafcategory/:leafId', upload.single('banner'), updateImage)

router.param('leafId', getByID)
module.exports = router;