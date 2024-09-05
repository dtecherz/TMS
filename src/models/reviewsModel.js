const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    message: {
        type: String,
        default: null
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

module.exports = mongoose.model('product-reviews', productReviewSchema);
