const Payment = require('../models/paymentModel')


const paymentController = {

    // ad payment method 

    async addPaymentMethod(req, res) {
        try {
            const { payment_type, Title, Account_Details } = req.body;

            if (!payment_type) {
                return res.status(400).send({
                    success: false,
                    message: "Payment type is required"
                });
            }

            if (payment_type !== "COD" && !Title) {
                return res.status(400).send({
                    success: false,
                    message: "Title is required"
                });
            }

            if (payment_type !== "COD" && !Account_Details) {
                return res.status(400).send({
                    success: false,
                    message: "Account Details are required"
                });
            }


            const newPayment = new Payment({
                payment_type,
                Title,
                Account_Details,
            });

            const savedPayment = await newPayment.save();

            return res.status(200).send({
                success: true,
                message: "Payment method added successfully",
                data: savedPayment
            });

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while adding payment method",
                error: error.message
            })
        }
    },



    // get payment methods 

    async getPaymentMethods(req, res) {
        try {
            const paymentMethods = await Payment.distinct("payment_type")
            const paymentMethodDetails = await Payment.find()
            return res.status(200).send({
                success: true,
                message: "payment methods got succesfuly",
                paymentMethods,
                paymentMethodDetails
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while getting payment methods",
                error: error.message
            })
        }
    },




    // change status of payment method 

    async updateStatus(req, res) {
        try {
            const { status, Title, payment_type, Account_Details } = req.body;
            const id = req.params.id;

            if (!id) {
                return res.status(400).send({ success: false, message: "Invalid ID" });
            }

            const payment = await Payment.findOneAndUpdate(
                { _id: id }, // Corrected the query to use _id
                { status, Title, payment_type, Account_Details },
                { new: true, runValidators: true } // Ensure we return the updated document and apply validations
            );

            if (!payment) {
                return res.status(404).send({ success: false, message: "Payment not found" });
            }

            return res.status(200).send({
                success: true,
                message: "Updated successfully",
                payment: payment
            });

        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while updating status",
                error: error.message
            });
        }
    },




    // get single paymnt method 

    async getSinglePaymentMethod(req, res) {
        try {
            const id = req.params.id
            const paymenyt_method = await Payment.findOne({ _id: id })
            if (!paymenyt_method) return res.status(400).send({ success: false, message: "no payment method found" })
            return res.status(200).send({
                success: true,
                message:"payment method got succesfully",
                paymentMethod:paymenyt_method

            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while getting payment method",
                error: error.message
            })
        }
    },


    // delete payment method 

    async deletePaymentMethod (req,res){
        try {
            const payment_id = req.params.id
            const paymentMethod = await Payment.findByIdAndDelete({_id:payment_id})
            if(!paymentMethod) return res.status(400).send({success:false,message:"No affected any payment method"})
                return res.status(200).send({
           success:true,
           message:"payment method deleted succesfully",
           paymentMethod:paymentMethod 
                })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while deleting payment method",
                error:error.message
            })
        }
    }




}


module.exports = paymentController