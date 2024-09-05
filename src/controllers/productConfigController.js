
const Product = require('../models/productModel')
const productConfig = require('../models/productConfigModel')

const productConfigController={
        

    async addProductConfig(req,res){
    //     try {
    //        const productConfigData = req.body
    //   let sumOfVariantQuantity = productConfigData.reduce((acc, res) => (acc + parseInt(res.stock_quantity, 10)), 0);
           
    //   const product = await Product.findOne({_id:productConfigData[0].product_id})
    //   const totalQuantityOfProduct = product.total_quantity

    //   if(totalQuantityOfProduct != null){

    //       if(sumOfVariantQuantity>totalQuantityOfProduct){
    //           return res.status(400).send({ success: false, message: "Stock quantity limit exceeded 1" });
              
    //         }
    //     }

    //     const ProductConfigQuery = await productConfig.find({product_id:productConfigData[0].product_id})

    //     if(ProductConfigQuery.length !== 0){

    //         let quantityFromDatabase = ProductConfigQuery.reduce((acc, res) => (acc + parseInt(res.stock_quantity, 10)), 0);

    //         if(totalQuantityOfProduct != null){
    //             if((sumOfVariantQuantity + quantityFromDatabase) > totalQuantityOfProduct){
    //                 return res.status(400).send({ success: false, message: "Stock quantity limit exceeded 2" });

    //             }
    //         }

    //         const newProductConfig = new productConfig.insertMany(productConfigData)

    //         console.log("newProductConfig",newProductConfig)
            
    //     }else{
            
    //         const newProductConfig = new productConfig.insertMany(productConfigData)
            
    //         console.log("newProductConfig",newProductConfig)
    //         // await newProductConfig.save()
    //     }


    //     }
    try {
        const productConfigData = req.body;
        console.log('productConfig',productConfigData)
        let sumOfVariantQuantity = productConfigData.reduce((acc, res) => (acc + parseInt(res.stock_quantity, 10)), 0);
    

        // get product whih=ch variants are creating 

        const product = await Product.findOne({ _id: productConfigData[0].product_id });
        if (!product) {
          return res.status(404).send({ success: false, message: "Product not found" });
        }
    
        const totalQuantityOfProduct = product.total_quantity;
    
        if (totalQuantityOfProduct != null) {
          if (sumOfVariantQuantity > totalQuantityOfProduct) {
            return res.status(400).send({ success: false, message: "Stock quantity limit exceeded 1" });
          }
        }
    
        const productConfigQuery = await productConfig.find({ product_id: productConfigData[0].product_id });
    
        if (productConfigQuery.length !== 0) {
          let quantityFromDatabase = productConfigQuery.reduce((acc, res) => (acc + parseInt(res.stock_quantity, 10)), 0);
    
          if (totalQuantityOfProduct != null) {
            if ((sumOfVariantQuantity + quantityFromDatabase) > totalQuantityOfProduct) {
              return res.status(400).send({ success: false, message: "Stock quantity limit exceeded 2" });
            }
          }
        }
    
         const newProductConfig = await productConfig.insertMany(productConfigData);
        console.log('productConfgi',newProductConfig)

       

        const newProductConfigIds = newProductConfig.map(config => config._id);

        // Update the product with the new product config IDs
        product.productConfig.push(...newProductConfigIds);
        await product.save();
        return res.status(200).send({ success: true, message: "Product config added successfully",productConfig:newProductConfig });
    
      }
         catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while adding product config",
                error:error.message
            })
        }
    },


    // get product variations 


    // get isingle product variations based on id 


    async getsingleProductVariations(req,res){
      try {

        const limit = parseInt(process.env.ProductLimitPerPage)
        // const limit = 1
            const page = parseInt(req.query.page) || 1;
            console.log("page",page)
        const product_id = req.params.product_id 
        // const productVraiations = await productConfig.find({product_id:product_id}).populate("size").populate("color").populate("material")
        const productVariations = await productConfig.find({ product_id: product_id })
        .populate({ path: 'size', select: 'name -_id' })
        .populate({ path: 'color', select: 'name -_id' })
        .populate({ path: 'material', select: 'name -_id' }).skip((page - 1) * limit).limit(limit);
        return res.status(200).send({
          success:true,
          message:"product variations got succesfully",
          ProductVariations:productVariations
        })
      } catch (error) {
        console.log(error)
        return res.status(400).send({
          success:false,
          message:"somehting went wrong while getting product variations",
          error:error.message 
        })
        
      }
    },

    // get all product variations 


    async getAllproductVariations(req,res){
      try {
        const limit = process.env.ProductLimitPerPage
        const page = parseInt(req.query.page) || 1;
        const ProductVariations = await productConfig.find()
        .populate({ path: 'size', select: 'name -_id' })
        .populate({ path: 'color', select: 'name -_id' })
        .populate({ path: 'material', select: 'name -_id' }).skip((page - 1) * limit).limit(limit);

        const totalProducts = await productConfig.countDocuments();

        return res.status(200).send({
          success:true,
          message:"product variants got succefully",
          productVariants:ProductVariations,
          totalProducts:totalProducts,
          ProductLimitPerPage:limit
        })
      } catch (error) {
        console.log(error)
        return res.status(400).send({
          success:false,
          messag:"something went wrong while getting product config",
          error:error.message
        })
      }
    }


}

module.exports=productConfigController

