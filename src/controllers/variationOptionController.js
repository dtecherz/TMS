const VariationOption = require('../models/variationOptionModel')
const Variation = require('../models/variationModel')




const variationOptionController = {

    // add variation option 


    async addVariationOption(req, res) {
        try {
            const { variation_id, name } = req.body;
    
            // Check if required fields are provided
            if (!variation_id || !name) {
                return res.status(400).json({ message: "Variation ID and Name fields are required" });
            }
    
            // Convert the name to lowercase for case-insensitive comparison
            const lowerCaseName = name.toLowerCase();
    
            // Check if variation option with the same name already exists for the given variation_id
            const existingOption = await VariationOption.findOne({ 
                variation_id, 
                name: { $regex: new RegExp(`^${lowerCaseName}$`, 'i') } // Case-insensitive regex
            });
    
            if (existingOption) {
                return res.status(409).json({ message: "This variation option already exists" });
            }
    
            // Create a new variation option
            const newOption = new VariationOption({ variation_id, name });
            await newOption.save();
    
            return res.status(200).json({
                success: true,
                message: "Variation option added successfully",
                variation_option: newOption
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to add variation option",
                error: error.message
            });
        }
    },
    




    // update variation option 


    async updateVariationOption(req, res) {
        try {
            const id = req.params.id;
            const { variation_id, name } = req.body;
    
            // Build update object based on provided fields
            const updateFields = {};
            if (variation_id) {
                updateFields.variation_id = variation_id;
            }
            if (name) {
                updateFields.name = name;
            }
    
            // Validate if there are fields to update
            if (Object.keys(updateFields).length === 0) {
                return res.status(400).json({ message: "No valid fields to update" });
            }
    
            // Find and update the variation option by ID
            const updatedOption = await VariationOption.findByIdAndUpdate(id, updateFields, { new: true });
    
            if (!updatedOption) {
                return res.status(404).json({ success: false, message: "Variation option not found" });
            }
    
            return res.status(200).json({
                success: true,
                message: "Variation option updated successfully",
                variation_option: updatedOption
            });
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"smething went wring while updating variation",
                error:error.message
            })
        }
    },



    // delete variation option 

    async  deleteVariationOption(req,res){

        try {
            const id = req.params.id

            const variationOption = await VariationOption.findByIdAndDelete(id)

            return res.status(200).send({
                success:true,
                message:"variation option deleted succesfully",
                deletedVariation:variationOption
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "somwthing went wrong while deleting variation option",
                error: error.message
            });
        }
    },



    // get single variation option 


    async getSingleVariationOptions(req,res){
        try {
            const id = req.params.id

            const variationOption = await VariationOption.findById(id).populate("variation_id")

            return res.status(200).send({
                success:true,
                message:"variation option got succesfully",
                variationOption:variationOption
            })
        } catch (error) {
            console.log(eroro)
            return res.status(400).send({
                success:false,
                message:"something went wrong while getting variation option",
                error:error.message
            })
        }
    },


    // get all variations 


    async getAllVariationOptions(req,res){
        try {
            const variationOptions = await VariationOption.find().populate("variation_id")

            if(variationOptions.length>0){
                return res.status(200).send({
                    success:true,
                    message:"variation option got succefsully",
                    VariationOptions:variationOptions
                })
            }
            else{
                return res.status(200).send({
                    success:true,
                    message:"no variation option addded yet",
                    variationOption:[]
                })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to get variation option",
                error: error.message
            });
        }
    },



    // get variation option based on variation 


    async getVariationOptions(req,res){
        try {

            const variation_id = req.params.variation_id
            const variationOptions = await VariationOption.find({variation_id:variation_id})

            return res.status(200).send({
                success:true,
                message:"variation options got sucesfully",
                variationOptions:variationOptions
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while geting options",
                error:error.message
            })
        }
    },



    // get variations based on variation name 

    async VariationOptionBasedOnName(req,res){
        try {

            const name = req.params.name
            console.log('nameeeeee',name)
            const variation = await Variation.findOne({name:name})
            console.log('variation',variation)
            if(!variation) return res.status(200).send({success:true,message:"No variation found "})
             const variationOption = await VariationOption.find({variation_id:variation._id}) 
            
            if(variationOption.length === 0 ) return res.status(200).send({success:true,message:"no varoiation option found"})
                return res.status(200).send({
            success:true,
            message:"variation option got succesfully",
            variationOption:variationOption
        })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while getting variation options",
                error:error.message 
            })
        }
    }



}


module.exports = variationOptionController