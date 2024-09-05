// models/galleryModel.js
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Gallery', gallerySchema);
