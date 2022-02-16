const Product = require('../models/product')
const _ = require('lodash')

exports.create = (req, res) => {
    const fields = req.body;
    const filterValue = JSON.parse(fields.filterValue)
    const prices = JSON.parse(fields.prices)
    const tablespecs = JSON.parse(fields.tablespecs)
    const specs = JSON.parse(fields.specs)
    const imgcollection = req.files.map((doc) => doc.path)
    console.log(
        filterValue,
        prices,
        tablespecs,
        specs,
        req.files
    )
    const product = new Product({
        name: fields.name,
        original_price: fields.original_price,
        selling_price: fields.selling_price,
        quantity: fields.quantity,
        sold: fields.sold,
        description: fields.description,
        filterValue: filterValue,
        category: fields.category,
        subCategory: fields.subCategory,
        leafCategory: fields.leafCategory,
        prices: prices,
        tablespecs: tablespecs,
        specs: specs,
        imgcollection: imgcollection,
        image: imgcollection[0],
        productQuantity: fields.productQuantity,
        varientID: fields.varientID
    })
    product.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json({
            message: 'Product Created Successfully',
            data: data
        });
    })
}

exports.lists = (req, res) => {
    Product.find().populate('category').populate('leafCategory').populate('subCategory').exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json(data);
    })
}

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        // .populate('leafCategory')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({ message: err });
            }
            req.product = data;
            next();
        })
}

exports.singleProduct = (req, res) => {
    return res.json(req.product)
}

exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map((item) => {
        return {
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        }
    });
    Product.bulkWrite(bulkOps, {}, (err, products) => {
        if (err) {
            return res.status(400).json({ error: 'could not update product' });
        }
        next();
    })
}

exports.prodductByCat = (req, res) => {
    // console.log(req.query)
    // console.log(req.body)
    const { skip, limit, orderBy } = req.query
    Product.find(req.body)
        .sort(orderBy)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .exec((err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ message: err });
            }
            return res.json(data);
        })
}

exports.prodductByVar = (req, res) => {
    const { skip, limit, orderBy } = req.query
    Product.find(req.body)
        .sort(orderBy)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .exec((err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ message: err });
            }
            return res.json(data);
        })
}

exports.serachprod = (req, res) => {
    name = req.query.name
    Product.find({ name: { $regex: `${name}`, $options: 'i' } }).exec((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            return res.json(data);
        }
    })
}

exports.updateProduct = (req, res) => {
    let banner = req.product
    banner = _.extend(banner, req.body)
    banner.save((err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Something Went Wrong !!!' });
        } else {
            return res.json({ message: "Product Update Successfully !!!", data: result });
        }
    })
}

exports.updateImage = (req, res) => {
    const vaarr = req.category
    if (vaarr.banner) {
        try {
            deleteFile(vaarr.banner)
        } catch (err) {
            console.log(err)
        }
    }
    let banner = req.category
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
    const category = req.product;
    // if (req.category.banner) {
    //     deleteFile(req.category.banner)
    // }
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json({ message: 'Product has been deleted successful' });
    })
}