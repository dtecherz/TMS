const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({


    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default:null
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    region:{
        type:String,
        enum:["pakistan"],
        required:true
    },
    state:{
        type:String,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
   
    Order_status: {
        type: String,
        enum: ["pending", "processing", "delivered", "completed","cancelled"],
        default: "pending"
    },
    sub_total: {
        type: Number,
        required: true
    },
    delivery_charges: {
        type: Number,
        required: true
    },
    payment_method: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment-Methods",
        required: true,
       
    },
    invoice_recipt:{
        type:String,
        default:"no img",
    
    },
    order_id:{
        type:Number,
        required:true
    },


    // if billing addres selecyed true 
    Biling_addres_select:{
        type:Boolean,
        default:false
    },
    billing_region:{
        type:String,
        enum:["pakistan"],
        default:null

    },
    billing_address:{
        type:String,
        default:null
    },
    billing_city:{
        type:String,
        default:null

    },
    billing_postal_code:{
        type:String,
        default:0

    },
    billing_phone:{
        type:String,
        default:0

    },
    shiping_method:{
        type:String,
        ref:"shiping-methods",
        require:true
    },
    
    total: {
        type: Number,
        required: true
    },
    product_config_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"productConfig",
        default:null 
    },
    user_type:{
        type:String,
        enum:["guest","user"],
        default:"user"
    }




}, {
    timestamps: true
})

module.exports = mongoose.model('orders', orderSchema)