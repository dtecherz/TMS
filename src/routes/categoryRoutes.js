const express = require('express')
const router  = express.Router()
const productCategoryController = require('../controllers/productCategoryController')
const {verfiyToken} = require('../middlware/jwt')

router.post("/add-category", verfiyToken,productCategoryController.addProductCategory);
router.put("/update-category/:id", productCategoryController.updateCategory);
router.get("/get-single/:id", productCategoryController.getSingleCategory);
router.delete("/delete-category/:id", productCategoryController.deleteCategory);
router.get("/get", productCategoryController.getAllCategories);






module.exports = router
