const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    payment_type: {
        type: String,
        enum: ["COD", "Direct-Bank-Transfer", "Digital-Wallet", "Payment-Gateway"],
        required: true
    },
    Title: {
        type: String,
        required: function() {
            return this.payment_type !== "COD";
        },
        

    },
    Account_Details: {
        type: String,
        required: function() {
            return this.payment_type !== "COD";
        },
        default:null
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment-Methods', paymentSchema);
