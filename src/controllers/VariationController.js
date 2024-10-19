    const Variation = require('../models/variationModel')

const variationController = {


    // create variation 

    async addVariation(req,res){
        try {
            const { name } = req.body;
    
            // Check if name field is provided
            if (!name) {
                return res.status(400).json({ message: "Name field is required" });
            }
    
            // Check if variation with the same name already exists
            const existingVariation = await Variation.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
            if (existingVariation) {
                return res.status(409).json({ message: "This variation already exists" });
            }
    
            // Create a new variation
            const newVariation = new Variation({ name });
            await newVariation.save();
    
            return res.status(200).json({
                success: true,
                message: "Variation added successfully",
                variation: newVariation
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to add variation",
                error: error.message
            });
        }
    },



    // update variation 


    async updateVriation(req,res){
        try {
            const variation_id = req.params.id 
            const {name} = req.body
            if(!name) return res.status(400).send({success:false,message:"name feild is required to update"})
            const variation = await Variation.findOneAndUpdate(variation_id,{name})

            return res.status(200).send({
                success:true,
                message:"variation updated succesfully",
                variation:variation
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while updating variation",
                error:error.message
            })
        }
    },



    // delete variation 

    async  deleteVariation(req,res){
        try {
            const variation_id = req.params.id

            const variation = await Variation.findByIdAndDelete(variation_id)

            return res.status(200).send({
                success:true,
                message:"variation deleted succesfully",
                DletedVariation:variation
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while deleting variation",
                error:error.message
            })
        }
    },


    // get single variation 


    async getsingleVariation(req,res){
        try {
            const variation_id = req.params.id

            const variation = await Variation.findById(variation_id)
            if(variation.length>0) return res.status(200).send({success: true,message:"variation got succesfully",variation:variation})

                return res.status(400).send({success:false,message:"invalid varoiation id"})
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while getting variations",
                error:error.message
            })
        }
    },




    // get all variations 


    async getAllVariations(req,res){
        try {
            const limit = process.env.VariationLimitPerPage
            const page = parseInt(req.query.page) || 1
            const variations = await Variation.find().skip((page - 1) * limit).limit(limit)
            const totalVariations = await Variation.countDocuments();
            if(variations.length>0){
                return res.status(200).send({
                    success:true,
                    message:"variations got succesfully",
                    variations:variations,
                    totalVariations:totalVariations,
                    VariationPerPage:limit
                })
            }else{
                return res.status(200).send({
                    success:true,
                    message:"no variations added yet",
                    variations:[]


                })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while getting variations",
                error:error.message
            })
        }
    }





}

module.exports = variationController