const Product = require('../models/productModel')
const ProductConfig = require('../models/productConfigModel')
const User = require('../models/userModel')
const Variation = require('../models/variationModel')
const VariationOption = require('../models/variationOptionModel')
const Category = require('../models/categoryModels')
const PaymentModal = require('../models/paymentModel')
const ShippingModal = require('../models/shippingModel')
const bcryptjs = require('bcryptjs')
const bcrypt = require('bcrypt');



const platform = async () => {
    try {
        const user = await User.find()
        console.log('user',user.length)
        if (!user || user.length === 0) {
            const password = "admin123"
            const saltRounds = 10;
            const hashedPassword = await bcryptjs.hash(password, saltRounds);
            const newUser = new User({
                email: "admin123@gmail.com",
                name: "admin",
                phone: "923012343456",
                password: hashedPassword,
                role: "admin"
            })
            await newUser.save()

            const variations = await Variation.insertMany([
                { name: "Color" },
                { name: "Size" },
                { name: "Material" }
            ]);


            // Extract the _id values from the inserted documents
            const colorId = variations.find(v => v.name === "Color")._id;
            const sizeId = variations.find(v => v.name === "Size")._id;
            const materialId = variations.find(v => v.name === "Material")._id;


            const variationOption = await VariationOption.insertMany([
                { variation_id: colorId, name: "red" },
                { variation_id: colorId, name: "blue" },
                { variation_id: colorId, name: "black" },
                { variation_id: sizeId, name: "small" },
                { variation_id: sizeId, name: "medium" },
                { variation_id: sizeId, name: "large" },
                { variation_id: materialId, name: "cotton" },
                { variation_id: materialId, name: "leather" },
                { variation_id: materialId, name: "jeans" },
            ])

            await new Category({ category_name: "Watches" }).save()
            await new Category({ category_name: "Bags" }).save()
            await new Category({ category_name: "Shoes" }).save()    
            const categoryId = variationOption.find(c=>c.category_name === "Watches")._id 

            const payment = new PaymentModal({
                payment_type:"COD",
                Title:"Cash On Delivery",
            })
            await payment.save()

            const shipping = new ShippingModal({
                name:"Free shipping",
                charges:0
            })

            await shipping.save()
          

            return { success: true, message: "databse added succesfully" }
        }


    } catch (error) {
        return { success: false, message: "Error creating databse" };

    }
}

module.exports = { platform }

