const Banner = require('../models/banners')

exports.createBanner = (req, res) => {
    const fields = req.body;

    const category = new Banner({
        banner: req.file.path,
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
        if(err){
            return res.status(400).json({ message: 'Something went wrong !!!' });
        }else{
            return res.json({ message: 'Banner Added', data: data });
        }
    })
}