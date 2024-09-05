const mongoose = require('mongoose')

slug = require('mongoose-slug-updater')
    mongoose.plugin(slug)

var Schema = mongoose.Schema

 variationSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true 
    },
    slug: { type: String, slug: "name" },

},{
    timestamps:true 
})


module.exports= mongoose.model('variations',variationSchema)