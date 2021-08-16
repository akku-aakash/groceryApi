const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String
    }
})

module.exports = User = mongoose.model('User', Userschema);