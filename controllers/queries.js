const Feedback = require('../models/feedback')
const Cancellation = require('../models/cancellation')
const Queries = require('../models/queries')

exports.feedbackById = (req, res, next, id) => {

}

exports.feedbackCreate = (req, res) => {
    const { name, email, phone, message } = req.body
    const feedback = new Feedback({
        name: name,
        email: email,
        phone: phone,
        message: message
    })

    feedback.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.json({
            message: 'Feedback Added',
            data: data
        });
    })
}


exports.feedbackList = (req, res) => {
    Feedback.find()
        .sort({ 'createdAt': 1 })
        .skip()
        .limit()
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({ message: err });
            }
            return res.json(data);
        })
}