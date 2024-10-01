const mongoose = require('mongoose')

slug = require('mongoose-slug-updater')
mongoose.plugin(slug)


 collectionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    slug: { type: String, slug: "name" },

    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
},{
    timestamps:true
})

module.exports = mongoose.model('collections',collectionSchema)