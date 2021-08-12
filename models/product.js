const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    original_price: {
        type: Number,
        required: true
    },
    selling_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    filterValue: [{
        name: String,
        value: String
    }],
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    subCategory: {
        type: ObjectId,
        ref: 'Subcategory'
    },
    leafCategory: {
        type: ObjectId,
        ref: 'Leafcategory'
    },
    prices: [{
        city: {
            type: ObjectId,
            ref: 'City'
        },
        original_price: {
            type: Number,
            required: true
        },
        selling_price: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            requiree: true
        },
    }],
    tablespecs: [{
        name: String,
        value: String
    }],
    specs: [{
        name: String,
        value: String
    }],
    image: {
        type: String,
        required: true
    },
    imgcollection: {
        type: Array
    }
})

module.exports = Product = mongoose.model('Product', productSchema);