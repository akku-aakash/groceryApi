const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = Feedback = mongoose.model("Feedback", FeedbackSchema);