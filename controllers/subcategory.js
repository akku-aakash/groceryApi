const Subcategory = require('../models/subcategory')

exports.create = (req, res) => {
    const fields = req.body;
    const subcat = new Subcategory({
        name: fields.name,
        banner: req.file.path,
        active: fields.active,
        parentId: fields.parentId
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