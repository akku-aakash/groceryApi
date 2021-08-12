const express = require('express')
const router = express.Router()
const multer = require('multer')
const { create } = require('../controllers/leafcategory');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/leafCategory/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post('/leafcategory/create', upload.single('banner'), create);
router.get('/leafcategory', (req, res) => {
    return res.json({ message: 'Hello From Category' });
})

module.exports = router;