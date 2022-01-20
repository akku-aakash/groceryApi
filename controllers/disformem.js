const Disformem = require('../models/disformem')
const _ = require('lodash')

exports.subsById = (req, res, next, id) => {
    Disformem.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.json({ message: "Subscription Not Found" });
        }
        req.disformem = user;
        next();
    });
}

exports.getitnow = (req, res) => {
    return res.json(req.disformem)
}

exports.create = (req, res) => {
    const { percentOff } = req.body

    const subs = new Disformem({
        percentOff: percentOff,
        title: "Discount4member"
    })

    if (percentOff) {
        Disformem.find().exec((err, data) => {
            if (err) {
                return res.json({ message: 'Something Went Wrong !' });
            } else {
                if (data.length == 0) {
                    subs.save((err, data) => {
                        if (err) {
                            return res.status(400).json({ error: err });
                        } else {
                            res.json({
                                message: 'Offer Data Added !!!',
                                data: data
                            });
                        }
                    })
                } else {
                    return res.json({ message: 'Data Already Saved !' });
                }
            }
        })
    } else {
        return res.json({ message: 'Please fill all Enteries !' });
    }
}

exports.list = (req, res) => {
    Disformem.find()
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({ error: err });
            } else {
                return res.json({ message: 'Data Fetched', data: data });
            }
        })
}

exports.editsub = (req, res) => {
    let banner = req.disformem
    banner = _.extend(banner, req.body)
    banner.save((err, result) => {
        if (err) {
            return res.json({ message: err });
        } else {
            return res.json(result);
        }
    })
}