const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const deliverystatusmodel = new mongoose.Schema({
    pickup: {
        address: String,
        lat: String,
        long: String,
    },
    deliveryadd: {
        address: String,
        lat: String,
        long: String,
    },
    modeofpayment: {
        type: String
    },
    Cancelled: {
        type: String
    },
    deliveryBoy: { type: ObjectId, ref: "User" },
    orderId: { type: ObjectId, ref: "Order" },
    statusChange: { type: Date }
}, {
    timestamps: true
})

module.exports = Deliverystatus = mongoose.model('Deliverystatus', deliverystatusmodel)