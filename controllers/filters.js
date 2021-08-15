const Filters = require('../models/filters')

exports.create = (req, res) => {
    const filteroptions = JSON.parse(req.body.options)
    const filter = new Filters({
        filterName: req.body.filterName,
        options: filteroptions,
        categories: req.body.categories
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