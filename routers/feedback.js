const express = require('express')
const router = express.Router()
const { userById } = require('../controllers/user')
const { feedbackById, feedbackCreate,feedbackList } = require('../controllers/queries')

router.get("/get/feedback", feedbackList);
router.post("/create/feedback", feedbackCreate);


router.param('feedbackId', feedbackById);

module.exports = router