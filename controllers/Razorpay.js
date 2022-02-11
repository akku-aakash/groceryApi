const Razorpay = require('razorpay');
const shortid = require('shortid');
const Timeslot = require('../models/timeslots')
const _ = require('lodash')

var razorpay = new Razorpay({
    key_id: 'rzp_test_uvifYhgFxSWOdD',
    key_secret: '2KKWoxZC9X53SPPNxj4KhL1z'
})

exports.generatePay = (req, res) => {
    const payyy = req.body.amount * 100
    const daata = {
        amount: payyy,  //amount == rs95
        currency: "INR",
        receipt: shortid.generate(),
        payment_capture: 1
    }

    razorpay.orders.create(daata, async (err, ress) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json(ress);
    })

}

exports.generateLink = (req, res) => {
    const { amount, name, email, phone, orderId } = req.body
    const linkDATA = {
        upi_link: true,
        amount: amount,
        currency: "INR",
        accept_partial: true,
        first_min_partial_amount: amount,
        description: `For order ${orderId} from Wildberries.`,
        customer: {
            name: name,
            email: email,
            contact: phone
        },
        notify: {
            sms: true,
            email: true
        },
        reminder_enable: true,
        notes: {
            order_id: orderId
        }
    }
    razorpay.paymentLink.create(linkDATA, (err, ress) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: err })
        }
        return res.json(ress)
    })
}

exports.addslot = (req, res) => {
    const timeslott = req.body.timeslot;
    const tim = new Timeslot({
        slots: timeslott
    })
    Timeslot.find().exec((err, orders) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        if (orders.length === 0) {
            tim.save((err, data) => {
                if (err) {
                    return res.status(400).json({ message: 'Something went wrong !!' });
                } else {
                    return res.json(data);
                }
            })
        } else {
            return res.status(400).json({ message: 'Data already present !!!' });
        }
    });
}

exports.findbysId = (req, res, next, id) => {
    Timeslot.findById(id).exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: 'Something went wrong !!!' });
        } else {
            req.timeslot = data;
            next()
        }
    })
}

exports.read = (req, res) => {
    Timeslot.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: 'Something went wrong !!!' });
        } else {
            return res.json(data);
        }
    })
};

exports.updateSlot = (req, res) => {
    let banner = req.timeslot
    banner = _.extend(banner, req.body)
    banner.save((err, data) => {
        if (err) {
            return res.status(400).json({ message: 'Something went wrong !!' });
        } else {
            return res.json(data);
        }
    })
}