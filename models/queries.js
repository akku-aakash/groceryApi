const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const QueriesSchema = new Schema({
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
    issues: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        required : true,
        ref: "User",
    }
}, {
    timestamps: true
});

module.exports = Queries = mongoose.model("Queries", QueriesSchema);