const Product = require('../models/product')

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
        image: imgcollection[0]
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
        .populate('leafCategory')
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
    Product.find(req.body)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({ message: err });
            }
            return res.json(data);
        })
}