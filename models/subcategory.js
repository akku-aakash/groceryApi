const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const subCategorySchema = new mongoose.Schema({
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
        ref: "Category",
        required: true
    }
})

module.exports = Subcategory = mongoose.model('Subcategory', subCategorySchema)