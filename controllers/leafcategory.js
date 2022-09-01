const Leafcategory = require('../models/leafcategory')
const { deleteFile } = require('../helpers/file')
const _ = require('lodash')
 

exports.getByID = (req, res, next, id) => {
    Leafcategory.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        req.leafcat = category;
        next();
    })
}

exports.readSingle = (req, res) => {
    return res.json(req.leafcat);
}

exports.create = (req, res) => {
    const fields = req.body;
    const leafcat = new Leafcategory({
        name: fields.name,
        banner: req.file.path ? req.file.path : "",
        active: fields.active,
        parentId: fields.parentId
    })
    leafcat.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json({
            message: 'Leafcategory Created Successfully',
            data: data
        });
    })
}

exports.list = (req, res) => {
    Leafcategory.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json(data);
    })
}

exports.lists = (req, res) => {
    Leafcategory.find()
        .populate('parentId', 'name')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({ message: err });
            }
            return res.json(data);
        })
}

exports.updatenow = (req, res) => {
    let banner = req.leafcat
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
    const vaarr = req.leafcat
    if (vaarr.banner) {
        try {
            deleteFile(vaarr.banner)
        } catch (err) {
            console.log(err)
        }
    }
    let banner = req.leafcat
    banner = _.extend(banner, { banner: req.file.path ? req.file.path : "", })
    banner.save((err, result) => {
        if (err) {
            return res.json({ message: err });
        } else {
            return res.json(result);
        }
    })
}

exports.remove = (req, res) => {
    const category = req.leafcat;
    if (req.leafcat.banner) {
        deleteFile(req.leafcat.banner)
    }
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json({ message: 'Leaf Category has been deleted successful' });
    })
}