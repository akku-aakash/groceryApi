const express = require('express')
const router = express.Router()
const multer = require('multer')
const { create } = require('../controllers/category');

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
router.get('/category', (req, res) => {
    return res.json({ message: 'Hello From Category' });
})

module.exports = router;