const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        unique:true
    }

})

module.exports = mongoose.model('cart',cartSchema)