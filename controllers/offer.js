const Offer = require('../models/offers')
const { deleteFile } = require('../helpers/file')
const _ = require('lodash')
 

exports.getByID = (req, res, next, id) => {
    Offer.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        req.offer = category;
        next();
    })
}

exports.readSingle = (req, res) => {
    return res.json(req.offer);
}

exports.create = (req, res) => {
    const fields = req.body;
    const discountOn = JSON.parse(fields.discountOn)
    const discount = JSON.parse(fields.discount)

    const leafcat = new Offer({
        title: fields.title,
        banner: req.file.path ? req.file.path.replaceAll(/\\/g, "/") : "",
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

exports.listOp = (req, res) => {
    Offer.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json(data);
    })
}


exports.updatenow = (req, res) => {
    let banner = req.offer
    banner = _.extend(banner, req.body)
    banner.save((err, result) => {
        if (err) {
            return res.json({ message: err });
        } else {
            return res.json(result);
        }
    })    
}

exports.updateImage = (req, res) => {
    const vaarr = req.offer
    if (vaarr.banner) {
        try {
            deleteFile(vaarr.banner)
        } catch (err) {
            console.log(err)
        }
    }
    let banner = req.offer
    banner = _.extend(banner, { banner: req.file.path ? req.file.path.replaceAll(/\\/g, "/") : "", })
    banner.save((err, result) => {
        if (err) {
            return res.json({ message: err });
        } else {
            return res.json(result);
        }
    })
}

exports.remove = (req, res) => {
    const category = req.offer;
    if (req.offer.banner) {
        deleteFile(req.offer.banner)
    }
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json({ message: 'Subcategory has been deleted successful' });
    })
}