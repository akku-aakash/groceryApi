const express = require('express')
const router = express.Router()
const { create, list } = require('../controllers/filters')

router.post('/filter/create', create);
router.get('/filters', list)

module.exports = router;