const mongoose = require('mongoose')

const orderLineSchema = new mongoose.Schema({

    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        required: true

    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    product_config_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productConfig",
        default: null

    }

}, {
    timestamps: true

})


module.exports = mongoose.model('orderlines', orderLineSchema)