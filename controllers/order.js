const { Order } = require('../models/order');

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, res) => {
            if (err || !res) {
                return res.status(400).json(err);
            }
            req.order = res;
            next()
        })
}

exports.create = (req, res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)

    order.save((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            return res.json(data);
        }
    })
}

exports.listOrders = (req, res) => {
    Order.find({ user: req.profile._id })
        .sort('-createdAt')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(orders)
        })
}

exports.allorders = (req, res) => {
    Order.find()
        .sort('-createdAt')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(orders)
        })
}