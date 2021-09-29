const express = require('express')
const router = express.Router()
const { userById } = require('../controllers/user')
const { feedbackById, feedbackCreate,feedbackList } = require('../controllers/queries')

router.get("/feedback", (req, res) => {

});

router.post("/create/feedback", feedbackCreate);

router.get('/feedback/:feedbackId', (req, res) => {

})

router.put('/feedback', feedbackList)

router.param('userId', userById);
router.param('feedbackId', feedbackById);

module.exports = router