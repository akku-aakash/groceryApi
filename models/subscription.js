const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const SubscriptionSchema = new Schema({
    title: {
        type: String,
        default: "elite",
        enum: ["elite", "wallet"]
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    transactionId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = Subscription = mongoose.model('Subscription', SubscriptionSchema);