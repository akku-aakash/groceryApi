const mongoose = require('mongoose')

const Subschema = new mongoose.Schema({
    actualAmount:{
        type: Number,
        required: true
    },
    sellingAmount:{
        type: Number,
        required: true
    },
    validationMonth:{
        type: Number,
        required: true
    },
    title:{
        type: String,
        default: "elite"
    }
})

module.exports = User = mongoose.model('Subs', Subschema);