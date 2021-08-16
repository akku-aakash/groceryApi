const mongoose = require('mongoose');
const schema = mongoose.Schema;

const filtersSchema = new schema({
    filterName: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    }
})

module.exports = Filters = mongoose.model("Filters", filtersSchema);