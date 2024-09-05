const mongoose = require('mongoose')

const ViewsSchema = new mongoose.Schema({
    product_id:{
        type:String,
        ref:"Product",
        required:true
    },
    views:{
        type:Number,
        required:true
    }
})


module.exports = mongoose.model('product-views',ViewsSchema)