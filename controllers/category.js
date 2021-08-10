const formidable = require('formidable')
const Category = require('../models/category')

exports.create = async (req, res) => {
    const fields = req.body;
    // console.log(JSON.parse(fields.noob))
    const filters = JSON.parse(fields.filters)

    const category = new Category({
        name: fields.name,
        active: fields.active,
        banner: req.file.path,
        filters: filters
    });
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json({
            message: 'Category Created Successfully',
            data: data
        });
    })
}

exports.getcat = (req, res) => {

}