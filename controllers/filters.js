const Filters = require('../models/filters')

exports.create = (req, res) => {
    const filter = new Filters({
        filterName: req.body.filterName,
        options: req.body.options
    })
    filter.save((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json({
            message: 'Filter Created Successfully',
            data: data
        });
    })
}

exports.list = (req, res) => {
    Filters.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json(data);
    })
}