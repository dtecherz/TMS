const mongoose = require('mongoose')


const socilaLinksSchema = new mongoose.Schema({
    // social links 

    name:{
        type:String,
        required:true
    },
    icon_name:{
        type:String,
        required:true
    },
    icon_link:{
        type:String,
        required:true,
    },

},{
    timestamps:true
})


module.exports = mongoose.model('social-links',socilaLinksSchema)





