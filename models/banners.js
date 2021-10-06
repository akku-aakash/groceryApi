const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    } ,
    redirect: {
        type : String
    },
    altText: {
        type: String,
        required: true
    }
})

module.exports = Banner = mongoose.model('Banner', bannerSchema)