const Shipping = require('../models/shippingModel')

const shippingController = {


    // add shipping method 

    async addShippingMethod(req,res){
        try {
            const {name,charges} = req.body
            if(!name) return res.status(400).send({success:false,message:"shipping methid name is required"})
            // if(!charges) return res.status(400).send({success:false,message:"shipping method charges is required"})

                // chcek that shipping method already exosts ornot 
                const shippingMethod = await Shipping.findOne({name:name})
                if(shippingMethod || shippingMethod !== null){
                    return res.status(400).send({success:false,message:"This shipping methid already exists"})
                }
                const newShippingMethod = new Shipping({
                    name:name,
                    charges:charges
                })
                await newShippingMethod.save()
                return res.status(200).send({
                    success:true,
                    message:"shipping method added succesfully",
                    shippingMethod:newShippingMethod
                })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"soemthing went wrong while adding shipping method",
                error:error.message
            })
        }
    },


    // get shipping methods 

    async getAllShippingMethods(req,res){
        try {
            const shippingMethods = await Shipping.find()
            if(shippingMethods.length === 0){
                return res.status(200).send({success:true,message:"no shipping method found",shippingMethods:[]})
            }
            return res.status(200).send({
                success:true,
                message:"shipping methods got succesfully",
                shippingMethods:shippingMethods
            })
                } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"somethifn went wrong while getting shipping methods",
                error:error.message
            })
        }
    }
}

module.exports = shippingController