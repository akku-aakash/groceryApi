const express = require('express')
const router = express.Router()
const { create, list, getByID, readSingle, remove,
    updateImage, updatenow
} = require('../controllers/offer');
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

router.get('/offers/:offerId', readSingle)
router.post('/offer/create', upload.single('banner'), create);
router.get('/offer', list);
router.put('/update/offers/:offerId', updatenow)
router.put('/update/image/offers/:offerId', upload.single('banner'), updateImage)
router.delete('/delete/offers/:offerId', remove)

router.param('offerId', getByID)

module.exports = router