const Category = require('../models/category')
const { deleteFile } = require('../helpers/file')

exports.create = async (req, res) => {
    const fields = req.body;
    // console.log(JSON.parse(fields.noob))
    const filters = JSON.parse(fields.filters)

    const category = new Category({
        name: fields.name,
        active: fields.active,
        banner: req.file.path,
        filters: filters,
        upToOff: fields.upToOff,
        description: fields.description
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

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        req.category = category;
        next();
    })
}

exports.readSingle = (req, res) => {
    return res.json(req.category);
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json(data);
    })
}

exports.filteringdata = (req, res) => {
    Category.find(req.body).exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        res.json(data);
    })
}

exports.update = (req, res) => {

}

exports.remove = (req, res) => {
    const category = req.category;
    if (req.category.banner) {
        deleteFile(req.category.banner)
    }
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json({ message: 'Category has been deleted successful' });
    })
}