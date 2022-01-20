const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    imgURL: {
        type: String
    },
    address: [{
        city: String,
        address: String,
        zip: Number,
        lang: String,
        long: String
    }],
    role: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    copounsused: [],
    subscription: {
        type: String,
        default: 'member'
    },
    subscriptionTime: {
        type: String
    },
    fcmtoken: {
        type: String
    }
})

module.exports = User = mongoose.model('User', Userschema);