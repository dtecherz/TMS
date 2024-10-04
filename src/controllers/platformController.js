const categoriesModel = require("../models/categoryModels");
const productModel = require("../models/productModel");
const SocialLinks = require('../models/LinksModel')


const platformController = {

    async productListPage(req, res) {
        try {
            let query = {}
            if (req.query.sub == "true") query = {}
            // if (req.query.sub == "true") query = { parent_category_id: { $ne: null } }

            const Categories = await categoriesModel.find(query, { createdAt: 0, updatedAt: 0, __v: 0, status: 0, status: 0 })

            let lowestPrice = await productModel.findOne({}, { price: 1 }).sort({ price: 1 });
            let highestPrice = await productModel.findOne({}, { price: 1 }).sort({ price: -1 });
            if (lowestPrice) lowestPrice = lowestPrice.price
            if (highestPrice) highestPrice = highestPrice.price

            // Get the total count of products
            const totalProducts = await productModel.countDocuments(query);

            return res.status(200).send({ success: true, categoies: Categories, lowestPrice, highestPrice,totalProducts })

        } catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Something went wrong while getting category", error: error.message });
        }
    },

    async productSearch(req, res) {
        try {

            const search = req.query.name

            if (typeof search == "undefined" || !search || search == "" || search == " " || search == null) throw "search query is empty";

            let products = await productModel.find({ name: { $regex: search.trim(), $options: 'i' }, status: "active" }, { name: 1,slug:1 }).limit(10);


            return res.status(200).send({ success: true, products })

        } catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Something went wrong while searching products", error: error });
        }
    },



    // navbar and footer links data 


    async addSocialLinksData(req, res) {
        try {
            const { name, icon_name, icon_link } = req.body
            if (!name) return res.status(400).send({ success: false, message: "name is required" })
            if (!icon_name) return res.status(400).send({ success: false, message: "icon_name is required" })
            if (!icon_link) return res.status(400).send({ success: false, message: "icon_link is required" })

            const icons = await SocialLinks.findOne({ icon_name: icon_name })
            if (icons) return res.status(400).send({ success: false, message: "this icon is already present" })

            const newIcons = new SocialLinks({
                name: name,
                icon_name: icon_name,
                icon_link: icon_link
            })

            await newIcons.save()

            return res.status(200).send({ success: true, message: "icon added in platform succesfuly" })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while getting adding data",
                error: error.message
            })
        }
    },




    // get all icons in platform


    async getSocialIcons(req, res) {
        try {
            const icons = await SocialLinks.find()
            return res.status(200).send({
                success: true,
                message: "social icons got succesfully",
                icons: icons
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while getting social icons",
                error: error.message
            })
        }
    },



    // platform setup api 

    async platformSetup(req,res){
        try {
            
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong ehile setting u platform",
                error:error.message

            })
        }
    }




}

module.exports = platformController
