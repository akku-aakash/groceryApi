const Disformem = require('../models/deliverystatus')
const _ = require('lodash')

exports.deliverystatus = (req, res, next, id) => {
    Disformem.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.json({ message: "Delivery Status Not Found" });
        }
        req.deliverystats = user;
        next();
    });
}

exports.orderIDdst = (req, res, next, id) => {
    Disformem.find({ orderId: id }).exec((err, user) => {
        if (err || !user) {
            return res.json({ message: "Delivery Status Not Found" });
        }
        req.delById = user;
        next();
    })
}

exports.orderIDdstdst = (req, res, next, id) => {
    Disformem.find({ deliveryBoy: id }).exec((err, user) => {
        if (err || !user) {
            return res.json({ message: "Delivery Status Not Found" });
        }
        req.deliveryboyID = user;
        next();
    })
}

exports.getitnow = (req, res) => {
    return res.json(req.deliverystats)
}

exports.getitnowOp = (req, res) => {
    return res.json(req.delById)
}

exports.getitnowOpOp = (req, res) => {
    return res.json(req.deliveryboyID)
}


exports.create = (req, res) => {
    const { pickupaddress, pickuplat, pickuplong, orderId, deliveryBoy } = req.body
    const subs = new Disformem({
        pickup: {
            address: pickupaddress,
            lat: pickuplat,
            long: pickuplong,
        },
        deliveryBoy: deliveryBoy,
        orderId: orderId
    })
    subs.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            res.json({
                message: 'Delivery Boy assigned Successfully !!!',
                data: data
            });
        }
    })
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
    let banner = req.deliverystats
    const { modeofpayment, Cancelled, statusChange } = req.body
    banner = _.extend(banner, {
        // deliveryadd: {
        //     address: deliveryaddaddress,
        //     lat: deliveryaddlat,
        //     long: deliveryaddlong,
        // },
        modeofpayment: modeofpayment,
        Cancelled: Cancelled,
        statusChange: statusChange
    })
    banner.save((err, result) => {
        if (err) {
            return res.json({ message: err });
        } else {
            return res.json(result);
        }
    })
}

exports.editsubsa = (req, res) => {
    let banner = req.deliverystats
    const { pickupaddress, pickuplat, pickuplong, deliveryBoy } = req.body
    banner = _.extend(banner, {
        pickup: {
            address: pickupaddress,
            lat: pickuplat,
            long: pickuplong,
        },
        deliveryBoy: deliveryBoy,
    })
    banner.save((err, result) => {
        if (err) {
            return res.json({ message: err });
        } else {
            return res.json(result);
        }
    })
}