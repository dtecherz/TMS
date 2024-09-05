const Category = require('../models/categoryModels')
const  Product = require('../models/productModel')

const categoryController = {


    async addProductCategory(req, res) {
        try {
            const categoryData = {
                category_name: req.body.category_name,
                status: req.body.status,
                parent_category_id: req.body.parent_category_id || null
            };

            if (!categoryData.category_name) {
                return res.json({ message: "Category name field is required" });
            }

            console.log('category fields', categoryData);

            // Check if the category already exists
            const existingCategory = await Category.findOne({ category_name: categoryData.category_name });
            if (existingCategory) {
                return res.status(400).send({
                    success: false,
                    message: "This category already exists"
                });
            }

            // Create a new category
            const newCategory = new Category(categoryData);
            const savedCategory = await newCategory.save();

            return res.status(200).send({
                success: true,
                message: "Category created successfully",
                category: savedCategory
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while adding category",
                error: error.message
            });
        }
    },

    async updateCategory(req, res) {
        try {
            const category_id = req.params.id
            const { category_name, parent_category_id, status } = req.body

            const categoryUpdate = await Category.findOneAndUpdate(category_id, { category_name, parent_category_id, status })

            return res.status(200).send({ success: true, message: "category updated succesfully", category: categoryUpdate })
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while adding category",
                error: error.message
            });
        }
    },



    // delete category 



    async deleteCategory(req, res) {
        try {
            const category_id = req.params.id
            const category = await Category.findOneAndDelete(category_id)
            return res.status(200).send({ success: true, message: "category deleted succesfuly" })
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while adding category",
                error: error.message
            });
        }
    },




    // get single category 


    async getSingleCategory(req, res) {
        try {
            const category_id = req.params.id
            const Category = await Category.findById(category_id)

            if (Category.length == 0) {
                return res.status(400).send({ success: false, message: "category does not found" })

            }
            return res.status(200).send({ success: true, message: "category got succesfully", category: Category })
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while getting category",
                error: error.message
            });
        }
    },


    async getAllCategories(req, res) {
        try {
            let query = {}
            if (req.query.sub == "true") {
                query = { parent_category_id: { $ne: null } }
            };


            const Categories = await Category.find(query).populate('parent_category_id')
            return res.status(200).send({ success: true, message: "categories got succesfully", categories: Categories })

        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while getting category",
                error: error.message
            });
        }
    },


    // get categories with product count 

    async getCategoriesWithProduct(req, res) {
        try {
            const category = await Category.find()

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while getting categoreis",
                error: error.message
            })
        }
    },




    // count product in single category 

    async countProductInCategory(req,res){
        try {
            const categoryProducts = await Product.aggregate([
                {
                  $group: {
                    _id: "$category_id", count: { $sum: 1}
                  }
                }
              ])


              console.log("categoryProducts",categoryProducts)
              return res.status(200).send({
                success:true,
                message:"categories with products count got successfully",
                categories:categoryProducts
              })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while counting product on categories",
                error:error.message
            })
        }

    }
}


module.exports = categoryController