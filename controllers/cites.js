const City = require('../models/cites')

exports.getCityById = (req, res, next, id) => {
    City.findById(id).exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        req.city = data;
        next();
    })
}

exports.getcity = (req, res) => {
    return res.json(req.city);
}

exports.create = (req, res) => {
    const fields = req.body
    const city = new City({
        name: fields.name,
        minOrder: fields.minOrder,
        deliveryCharge: fields.deliveryCharge,
        state: fields.state
    })

    city.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json({
            message: 'City Added Successfully',
            data: data
        });
    })
}

exports.cityList = (req, res) => {
    City.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            return res.json(data);
        }
    })
}