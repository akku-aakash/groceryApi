const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const CartItemsSchema = new mongoose.Schema({
    product: { type: ObjectId, ref: "Product" },
    name: String,
    price: Number,
    count: Number
},
    { timestamps: true }
);

const CartItem = mongoose.model('CartItem', CartItemsSchema)

const orderSchema = new mongoose.Schema({
    products: [CartItemsSchema],
    transaction_id: { type: String },
    amount: { type: Number },
    address: String,
    offerApplied: String,
    orderType: String,
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    updated: Date,
    user: { type: ObjectId, ref: "User" }
},
    { timestamps: true }
);

Order = mongoose.model('Order', orderSchema);

module.exports = { Order, CartItem }