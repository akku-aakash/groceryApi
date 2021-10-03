const { Order } = require('../models/order');

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .populate('user')
        .exec((err, res) => {
            if (err || !res) {
                return res.status(400).json(err);
            }
            req.order = res;
            next()
        })
}

exports.Orderfind = (req, res) => {
    return res.json(req.order);
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

exports.deliveryBoy = (req, res) => {
    const { delId } = req.query
    Order.find({ deliveryBoy: delId })
        .sort('-createdAt')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            console.log(orders)
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

exports.updateStaus = (req, res) => {
    const { deliveryname, status } = req.body
    if (deliveryname) {
        Order.updateOne(
            { _id: req.order._id },
            { status: status, deliveryBoy: deliveryname }, (err, save) => {
                if (err) {
                    res.json({
                        message: 'Something Went Wrong in updating user !'
                    });
                } else {
                    res.json({
                        message: 'Order Updated !',
                        data: save
                    });
                }
            }
        )
    } else {
        Order.updateOne(
            { _id: req.order._id },
            { status: status }, (err, save) => {
                if (err) {
                    res.json({
                        message: 'Something Went Wrong in updating user !'
                    });
                } else {
                    res.json({
                        message: 'Order Updated !',
                        data: save
                    });
                }
            }
        )
    }

}