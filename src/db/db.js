const mongoose = require('mongoose')
const { MONGO_URL } = require('../config/config')
const { platform } = require('../services/platformFunction')

async function connectDb() {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('database connected succesfully')
        platform()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDb;