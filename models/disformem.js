const mongoose = require('mongoose');

const discountformemSchema = new mongoose.Schema({
    percentOff: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = Disformem = mongoose.model('Disformem', discountformemSchema)