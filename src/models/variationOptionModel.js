const mongoose = require('mongoose')
slug = require('mongoose-slug-updater')
    mongoose.plugin(slug)

var Schema = mongoose.Schema

 variationOptionSchema = new mongoose.Schema({

    variation_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Variation', 
        required: true
     }, 

    name: { 
        type: String, 
        required: true ,
        unique:true
    },
    slug: { type: String, slug: "name" },

})



module.exports = mongoose.model('variationOptions', variationOptionSchema)