const Subscriber = require('../models/subscriberModel')

const subscriberController = {

    // add subscriber 
    async addSubscriber(req,res){
        try {
           const {email} = req.body
           if(!email) return res.status(400).send({success:false,message:"email is required"})
           const subscriber =  await Subscriber.findOne({email:email})
           if(subscriber || subscriber !== null) return res.status(400).send({success:false,message:"already subscribed with this email"})

            const newSubscriber = new Subscriber({
                email:email
            })
            await newSubscriber.save()
            return res.status(200).send({
                success:true,
                message:"subscribed succesfully",
                subscriber:subscriber
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while adding subscriber",
                error:error.message
            })
        }
    },


    // get all subscriber 


    async getSubscribers(req,res){
        try {
            const subscribers = await Subscriber.find()
            return res.status(200).send({
                success:true,
                message:"subscriber got succesfully",
                subscriber:subscribers
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while getting subscriber",
                error:error.message
            })
        }
    }


}


module.exports = subscriberController