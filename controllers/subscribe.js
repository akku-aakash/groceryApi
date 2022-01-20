const Subscription = require('../models/subsribe')
const _ = require('lodash')

exports.subsById = (req, res, next, id) => {
    Subscription.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.json({ message: "Subscription Not Found" });
        }
        req.subs = user;
        next();
    });
}

exports.create = (req, res) => {
    const { actualAmount, sellingAmount, validationMonth, title } = req.body

    const subs = new Subscription({
        title: title,
        actualAmount: actualAmount,
        sellingAmount: sellingAmount,
        validationMonth: validationMonth
    })

    if (title && actualAmount && sellingAmount && validationMonth) {
        subs.save((err, data) => {
            if (err) {
                return res.status(400).json({ error: err });
            } else {
                res.json({
                    message: 'Subscription Data Added !!!',
                    data: data
                });
            }
        })
    } else {
        return res.json({ message: 'Please fill all Enteries !' });
    }
}

exports.list = (req, res) => {
    Subscription.find()
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({ error: err });
            } else {
                return res.json({ message: 'Data Fetched', data: data });
            }
        })
}

exports.editsub = (req,res) =>{
    let banner = req.subs
    banner = _.extend(banner, req.body)
    banner.save((err, result) => {
        if (err) {
            return res.json({ message: err });
        } else {
            return res.json(result);
        }
    })    
}