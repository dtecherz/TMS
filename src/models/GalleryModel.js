// models/galleryModel.js
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true
    },
    source:{
        type:String,
        default:"Internal"
    },
    type:{
        type:"String",
        enum:["image","video","external-image"],
        default:"image"
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Gallery', gallerySchema);
