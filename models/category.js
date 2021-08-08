const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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
        requiree: true
    },
    filters: {
        type: Array
    }
})

module.exports = Category = mongoose.model('Category', categorySchema)