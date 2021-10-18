const mongoose = require('mongoose')

const timeslotschema = new mongoose.Schema({
    slots: []
})

module.exports = Timeslot = mongoose.model('Timeslot', timeslotschema)