const express = require('express')
const router = express.Router()
const { userById } = require('../controllers/user')
const { feedbackById } = require('../controllers/queries')

router.get("/feedback", (req, res) => {

});

router.post("/create/feedback", (req, res) => {

});

router.get('/feedback/:feedbackId', (req, res) => {

})

router.put('/feedback', (req, res) => {

})

router.param('userId', userById);
router.param('feedbackId', feedbackById);

module.exports = router