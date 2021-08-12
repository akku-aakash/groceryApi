const Leafcategory = require('../models/leafcategory')

exports.create = (req, res) => {
    const fields = req.body;
    const leafcat = new Leafcategory({
        name: fields.name,
        banner: req.file.path,
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