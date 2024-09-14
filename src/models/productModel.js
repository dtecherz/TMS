const mongoose = require('mongoose');
const Category = require('./categoryModels')

slug = require('mongoose-slug-updater')
    mongoose.plugin(slug)

var Schema = mongoose.Schema

productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: { type: String, slug: "name" },
    short_description: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories', // assuming you have a Category model
        required: true
    },
    long_description: {
        type: String,
        // required: true,
        default:"string"
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    stock_management: {
        type: Boolean,
        required: true,
        default:0
    },
    SKU: {
        type: String,
        unique:true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default:0,
        min:0,
        max:100
    },
    total_quantity: {
        type: Number,
        default: 0,
    },
    productConfig:[{
        type:String,
        ref:'productConfig',
        required:false
    }],
    images: [{
        type: String ,
        ref: 'Gallery', // Assuming 'Gallery' is the name of the gallery model
        required: true
    }],
   

}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', productSchema);
