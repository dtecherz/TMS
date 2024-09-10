const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)


const categorySchema = new mongoose.Schema({
    parent_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    category_name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: "category_name"
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    pCount: {  // how many product are under this category
        type: Number,
        default: 0
    },

}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});


module.exports = mongoose.model('categories', categorySchema);