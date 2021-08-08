const mongoose = require('mongoose');

const connectDB = async () => {
    connection = await mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log('database not connected ', err);
        }
        else {
            console.log('database connected successfully');
        }
    });
};

module.exports = connectDB;