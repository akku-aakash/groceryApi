const express = require('express')
const router = express.Router()
const { create, list, remove, updatefilter, 
    getfilter, getfilterById } = require('../controllers/filters')

router.get('/filters', list)
router.post('/filter/create', create);
router.get('/filter/:filterId', getfilter)
router.put('/update/filter/:filterId', updatefilter);
router.delete('/filter/:filterId', remove)

router.param('filterId', getfilterById )
module.exports = router;