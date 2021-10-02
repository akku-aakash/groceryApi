const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const CartItemsSchema = new mongoose.Schema({
    product: { type: ObjectId, ref: "Product" },
    name: String,
    price: Number,
    count: Number,
    imgURL: String,
    quantity: String
},
    { timestamps: true }
);

const CartItem = mongoose.model('CartItem', CartItemsSchema)

const orderSchema = new mongoose.Schema({
    products: [CartItemsSchema],
    transaction_id: { type: String },
    amount: { type: Number },
    address: {
        address: String,
        city: String,
        zip: String
    },
    offerApplied: String,
    orderType: String,
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    updated: Date,
    user: { type: ObjectId, ref: "User" },
    deliveryType: { type: String },
    expectedDelivery: { type: Date },
    deliveryBoy: { type: ObjectId, ref: 'User' },
    tax: { type: Number },
    deliveryCharge: { type: Number },
    offPrice: { type: Number }
}, {
    timestamps: true
});

Order = mongoose.model('Order', orderSchema);

module.exports = { Order, CartItem }