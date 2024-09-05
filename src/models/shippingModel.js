const mongoose = require('mongoose')

const shipingSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    charges: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        defualt: "active"
    }
})

module.exports = mongoose.model('shiping-methods', shipingSchema)