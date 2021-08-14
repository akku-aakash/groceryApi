const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 40
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
    },
    upToOff: {
        type: Number
    },
    description: {
        type: String
    }
})

module.exports = Category = mongoose.model('Category', categorySchema)