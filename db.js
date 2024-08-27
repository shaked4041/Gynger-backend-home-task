const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL

function connect() {
    try {
        mongoose.connect(MONGO_URL)
            .then(() => {
                console.log("DB - Connection Success");
            })
    } catch (error) {
        console.log("MongoDB error:", error);
    }
}

module.exports = { connect }