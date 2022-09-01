const Banner = require('../models/banners')
const { deleteFile } = require('../helpers/file')
const _ = require('lodash')

exports.bannerById = (req, res, next, id) => {
    Banner.findById(id).exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: 'Something Went Wrong !!' });
        } else {
            req.banner = data
            next();
        }
    })
}

exports.singleBanner = (req, res) => {
    return res.json(req.banner);
}

exports.createBanner = (req, res) => {
    const fields = req.body;
    const category = new Banner({
        banner: req.file.path ? req.file.path : "",
        altText: fields.altText,
        redirect: fields.redirect
    });
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json({
            message: 'Banner Created Successfully',
            data: data
        });
    })
}

exports.fetchBanner = (req, res) => {
    Banner.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: 'Something went wrong !!!' });
        } else {
            return res.json({ message: 'Banner Added', data: data });
        }
    })
}


exports.updateBanner = (req, res) => {
    let banner = req.banner
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
    const vaarr = req.banner
    if (vaarr.banner) {
        try {
            deleteFile(vaarr.banner)
        } catch (err) {
            console.log(err)
        }
    }
    let banner = req.banner
    banner = _.extend(banner, { banner: req.file.path ? req.file.path : "", })
    banner.save((err, result) => {
        if (err) {
            return res.json({ message: err });
        } else {
            return res.json(result);
        }
    })
}

exports.deleteBanner = (req, res) => {
    const category = req.banner;
    if (req.banner.banner) {
        deleteFile(req.banner.banner)
    }
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json({ message: 'Banner has been deleted successful' });
    })
}
