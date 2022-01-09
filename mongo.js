const mongoose = require("mongoose")
require("dotenv").config()

module.exports = async() => {
    await mongoose.connect(
        process.env.mongodb_uri,
        {
            keepAlive: true
        }
    )
    return mongoose
}