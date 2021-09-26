const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema
const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    perUserLimit: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    discountOn: {
        named: {
            type: String,
            default: "All",
            enum: ["All", "Category", "Product", "Subcategory"]
        },
        valued: { type: String }
    },
    discount: {
        named: {
            type: String,
            default: "Percent",
            enum: ["Percent", "Amount"]
        },
        valued: { type: Number },
        minOrder: {type: Number}
    },
    firstOrder: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true
})

module.exports = Offer = mongoose.model('Offer', offerSchema)