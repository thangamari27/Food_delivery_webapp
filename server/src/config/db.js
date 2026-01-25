const mongoose = require('mongoose');
const { MONGO_URI } = require('./env');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log("MongoDB connect successfully ");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = {
    connectDB
};