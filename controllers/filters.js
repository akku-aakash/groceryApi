const Filters = require('../models/filters')
const _ = require('lodash')
 
exports.getfilterById = (req, res, next, id) => {
    Filters.findById(id).exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        req.filter = data;
        next();
    })
}

exports.getfilter = (req, res) => {
    return res.json(req.filter);
}

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

exports.updatefilter = (req, res) => {
    let banner = req.filter
    banner = _.extend(banner, req.body)
    banner.save((err, result) => {
        if (err) {
            return res.json({ message: err });
        } else {
            return res.json(result);
        }
    })    
}

exports.remove = (req, res) => {
    const category = req.filter;
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json({ message: 'Filter has been deleted successfully !!!' });
    })
}