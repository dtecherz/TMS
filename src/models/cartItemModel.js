const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({

    cart_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart",
        required:true
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true 
        
    },
    product_config_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"productConfig",
        default:null 
    },
    quantity:{
        type:Number,
        required:true,
    },


})



module.exports = mongoose.model('cartItem',cartItemSchema)