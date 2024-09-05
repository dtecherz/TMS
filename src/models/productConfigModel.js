const mongoose = require('mongoose')




const productConfigSchema = new mongoose.Schema({

    size:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"variationOptions",
        rquired:true,
        default:null

    },
    color:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"variationOptions",
        rquired:true,
        default:null

    },
    material:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"variationOptions",
        rquired:true,
        default:null
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        rquired:true
    },
    price:{
        type:Number,
        required:true
    },
    stock_quantity:{
        type:Number,
        required:true 
    }

})



module.exports = mongoose.model('productConfig',productConfigSchema)