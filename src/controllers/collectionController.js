const Collection = require('../models/collectionModel')

const collectionController = {




    // create collection 
    async createColection(req,res){
        try {
            const {name,products,status} = req.body
            if(!name){
                return res.status(400).send({success:false,message:"name is required"})
            }

            const collection = await Collection.findOne({name:name})
            if(collection) return res.status(400).send({success:false,message:"this collection already exist"})

                const newCollection = new Collection({
                    name,
                    products,
                    status 
                })
                await newCollection.save()
                return res.status(200).send({success:true,message:"collectioon created succesfully",collection:newCollection})
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"somethng went wrong while creating collection",
                error:error.message
            })
        }
    },





    // update colection 


    async updateCollection(req,res){
        try {
            const {name,products,status}= req.body
            const id = req.params.id
            if(!id) return res.status(400).send({success:false,message:"collection id is required"})
            const updatedData = {}

            if(name){
                updatedData.name = name
            }
            if(products){
                updatedData.products = products
            }
            if(status){
                updatedData.status = status
            }

            const collection = await findOne({_id:id})
            if(!collection){
                return res.status(400).send({success:false,message:"invalid collection id"})
            }


            const updateCollection = await Collection.findOneAndUpdate(id,updatedData)
            if(!collection) return res.status(400).send({success:false,message:"no collection found"})
                return res.status(200).send({success:true,message:"collection updated succesfully",colection:updateCollection})
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while updating",
                error:error.message
            })
        }
    },




    // get single collection 

    async getSingleCollection(req,res){
        try {
            const slug = req.params.slug
            const id = req.params.id

            const collection = await Collection.findOne({slug:slug}).populate('products')
            if(!collection) return res.status(400).send({success:false,message:"no collection found"})

                return res.status(200).send({
                    success:true,
                    message:"collection got succesfully",
                    collection:collection
                })

        } catch (error) {
            console.log(error)
            return res.status(400).send({success:false,message:"something went wrong while getting this collection",error:error.message})
        }
    },



    // get all collections 


    async getAllCollection(req,res){
        try {
            
            const collections = await Collection.find().populate({
                path: "products",
                select: "name",
            })
            
            

            if(collections.length <1){
                return res.status(200).send({success:true,message:"no collection found", collections:[]})

            }

            return res.status(200).send({
                success:true,
                message:"collection got succesfully",
                collections:collections

            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"soemthing went wrong whilet getting collections",
                error:error.message 
            })
        }
    },




    // delete collectioon 

    async deleteCollection(req,res){
        try {
            const id = req.params.id
            if(!id) return res.status(400).send({success:false,message:"id is required"})
            const colection = await Collection.findByIdAndDelete({_id:id })
        if(!colection) return res.status(400).send({success:false,message:'no collection found to delete'})

            return res.status(200).send({
                success:true,
                message:"deleted succesfully",
                collection:colection
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({success:false,message:"something went wrong while deleting",error:error.message})
        }
    }

}

module.exports = collectionController