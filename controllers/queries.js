const Feedback = require('../models/feedback')
const Cancellation = require('../models/cancellation')
const Queries = require('../models/queries')
const _ = require('lodash')

// FETCH BY ID
exports.feedbackById = (req, res, next, id) => {
    Feedback.findById(id)
    .exec((err, res) => {
      if (err || !res) {
        return res.status(400).json(err);
      }
      req.feedback = res;
      next();
    });
}

exports.reportById = (req, res, next, id) => {
    Queries.findById(id)
    .exec((err, res) => {
      if (err || !res) {
        return res.status(400).json(err);
      }
      req.query = res;
      next();
    });
}

exports.canellationById = (req, res, next, id) => {
    Cancellation.findById(id)
    .exec((err, res) => {
      if (err || !res) {
        return res.status(400).json(err);
      }
      req.cancellation = res;
      next();
    });
}


// CREATE DATA
exports.feedbackCreate = (req, res) => {
    const { name, email, phone, message } = req.body
    const feedback = new Feedback({
        name: name,
        email: email,
        phone: phone,
        message: message
    })

    Feedback.find({ email: email }).exec((err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            console.log(data)
            if (data.length !== 0) {
                return res.json({ message: 'Your Already Give feedback' });
            } else {
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
        }
    })

}

exports.queriesCreate = (req, res) => {
    const { name, email, phone, issues, user } = req.body
    const query = new Queries({
        name: name,
        email: email,
        phone: phone,
        issues: issues,
        user: user,
        // isSolved: isSolved
    })
    query.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.json({
            message: 'Query Added Successfully !',
            data: data
        });
    })
}

exports.cancelationCreate = (req, res) => {
    const { name, email, phone, issues, user, orderId } = req.body
    const query = new Cancellation({
        name: name,
        email: email,
        phone: phone,
        issues: issues,
        user: user,
        orderId: orderId,
        // isSolved: isSolved
    })
    Cancellation.find({ orderId: orderId }).exec((err, dataa) => {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            if (dataa.length === 0) {
                query.save((err, data) => {
                    if (err) {
                        return res.status(400).json({ error: err });
                    }
                    return res.json({
                        message: 'Cancellation Request Added Successfully !',
                        data: data
                    });
                })
            } else {
                return res.json({ message: 'You Already Requested !!!' });
            }
        }
    })
}


//FETCH DATA

exports.feedbackList = (req, res) => {
    Feedback.find()
        .sort({ 'createdAt': -1 })
        .skip()
        .limit()
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({ message: err });
            }
            return res.json(data);
        })
}

exports.getreport = (req, res) => {
    const limit = req.query.lim ? req.query.lim : 50;
    const skipp = req.query.skipp ? req.query.skipp : 0;
    Queries.find()
    .sort({ 'createdAt': -1 })
    .skip(skipp)
    .limit(limit)
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json(data);
    })
}

exports.getCanellation = (req, res) => {
    const limit = req.query.lim ? req.query.lim : 50;
    const skipp = req.query.skipp ? req.query.skipp : 0;
    Cancellation.find()
    .sort({ 'createdAt': -1 })
    .populate('order')
    .skip(skipp)
    .limit(limit)
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json(data);
    })
}