const Offer = require('../models/offers')

exports.create = (req, res) => {
    const fields = req.body;
    const discountOn = JSON.parse(fields.discountOn)
    const discount = JSON.parse(fields.discount)

    const leafcat = new Offer({
        title: fields.title,
        banner: req.file.path,
        description: fields.description,
        perUserLimit: fields.perUserLimit,
        active: fields.active,
        discountOn: discountOn,
        discount: discount,
        firstOrder: fields.firstOrder
    })

    leafcat.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json({
            message: 'Offer Created Successfully',
            data: data
        });
    })
}

exports.list = (req, res) => {
    Offer.find({ active: true }).exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json(data);
    })
}
