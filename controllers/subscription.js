const Subscription = require('../models/subscription')
const User = require('../models/users')

exports.subsById = (req, res, next, id) => {
    Subscription.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.json({ message: "Transaction Not Found" });
        }
        req.subscription = user;
        next();
    });
}

exports.create = (req, res) => {
    const { title, userId, transactionId, orderId, amount, duration } = req.body

    const subs = new Subscription({
        title: title,
        userId: userId,
        transactionId: transactionId,
        orderId: orderId,
        amount: amount
    })

    if (title && userId && transactionId && amount) {
        subs.save((err, data) => {
            if (err) {
                return res.status(400).json({ error: err });
            } else {
                if (title === 'walletdel') {
                    User.updateOne(
                        { _id: userId },
                        { $inc: { coins: -parseInt(amount) } }, (err, save) => {
                            if (err) {
                                res.json({
                                    message: 'Something Went Wrong in updating user !'
                                });
                            } else {
                                res.json({
                                    message: 'Transaction Added !',
                                    data: data
                                });
                            }
                        }
                    )
                } else if (title === 'elite') {
                    var ss = duration ? duration : 1;
                    User.updateOne(
                        { _id: userId },
                        { subscription: "elite", subscriptionTime: new Date(new Date().setMonth(new Date().getMonth() + ss)) }, (err, save) => {
                            if (err) {
                                res.json({
                                    message: 'Something Went Wrong in updating user !'
                                });
                            } else {
                                res.json({
                                    message: 'Membership Added !',
                                    data: data,
                                    userData: save
                                });
                            }
                        }
                    )
                } else {
                    User.updateOne(
                        { _id: userId },
                        { $inc: { coins: parseInt(amount) } }, (err, save) => {
                            if (err) {
                                res.json({
                                    message: 'Something Went Wrong in updating user !'
                                });
                            } else {
                                res.json({
                                    message: 'Transaction Added !',
                                    data: data
                                });
                            }
                        }
                    )
                }
            }
        })
    } else {
        return res.json({ message: 'Please fill all Enteries !' });
    }
}

exports.listByUser = (req, res) => {
    const { userId } = req.query
    Subscription.find({ userId: userId })
        .sort({ 'createdAt': -1 })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({ error: err });
            } else {
                return res.json({ message: 'Data Fetched', data: data });
            }
        })
}