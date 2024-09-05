const Reviews = require('../models/reviewsModel')


const productReviewsController = {

    // add reviews 

    async addReview(req,res){
        try {
            const {product_id,message,stars}= req.body;
            if(!product_id) return res.status(400).send({success:false,message:"product is required"})
            if(!stars) return res.status(400).send({success:false,message:"stars is required"})

                const newReview = new Reviews({
                    product_id:product_id,
                    message:message,
                    stars:stars
                })

                await newReview.save()
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while adding review",
                error:error.message

            })
        }
    },
    

}

module.exports = productReviewsController