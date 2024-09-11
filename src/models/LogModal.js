const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    userId: {
        type: String,
        
    },
    dateTime: {
        type: Date,
        default: Date.now()
    },
    action: {
        type: String,
        enum: ["register","login", "addToCart", "Order","guest-user"]
    },
    details: {
        type: Object,
        required: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('log', LogSchema)