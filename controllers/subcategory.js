const Subcategory = require('../models/subcategory')
const { deleteFile } = require('../helpers/file')
const _ = require('lodash')
 

exports.getByID = (req, res, next, id) => {
    Subcategory.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        req.subcat = category;
        next();
    })
}

exports.readSingle = (req, res) => {
    return res.json(req.subcat);
}

exports.create = (req, res) => {
    const fields = req.body;
    const subcat = new Subcategory({
        name: fields.name,
        banner: req.file.path,
        active: fields.active,
        parentId: fields.parentId,
        upToOff: fields.upToOff,
        description: fields.description
    })
    subcat.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json({
            message: 'Subcategory Created Successfully',
            data: data
        });
    })
}

exports.list = (req,res) => {
    Subcategory.find().exec((err,data) => {
        if(err){
            return res.status(400).json({ message: err });
        }
        return res.json(data);
    })
}

exports.lists = (req,res) => {
    Subcategory.find()
    .populate('parentId', 'name')
    .exec((err,data) => {
        if(err){
            return res.status(400).json({ message: err });
        }
        return res.json(data);
    })
}

exports.updatenow = (req, res) => {
    let banner = req.subcat
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
    const vaarr = req.subcat
    if (vaarr.banner) {
        try {
            deleteFile(vaarr.banner)
        } catch (err) {
            console.log(err)
        }
    }
    let banner = req.subcat
    banner = _.extend(banner, { banner: req.file.path })
    banner.save((err, result) => {
        if (err) {
            return res.json({ message: err });
        } else {
            return res.json(result);
        }
    })
}

exports.remove = (req, res) => {
    const category = req.subcat;
    if (req.subcat.banner) {
        deleteFile(req.subcat.banner)
    }
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json({ message: 'Subcategory has been deleted successful' });
    })
}