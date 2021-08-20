const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    minOrder: {
        type: Number
    },
    deliveryCharge: {
        type: Number
    },
    state: {
        type: String
    }
});

module.exports = City = mongoose.model("City", citySchema);