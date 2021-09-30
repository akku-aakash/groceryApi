const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const SubscriptionSchema = new Schema({
    title: {
        type: String,
        default: "elite",
        enum: ["elite", "walletadd", "walletdel"]
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
    orderId: {
        type: ObjectId,
        ref:"Order"
    }
}, {
    timestamps: true
})

module.exports = Subscription = mongoose.model('Subscription', SubscriptionSchema);