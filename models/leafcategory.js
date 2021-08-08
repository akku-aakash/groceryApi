const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const leafCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    banner: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    parentId: {
        type: ObjectId,
        ref: "Subcategory",
        required: true
    }
})

module.exports = Leafcategory = mongoose.model('Leafcategory', leafCategorySchema)