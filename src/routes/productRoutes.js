const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
const {verfiyToken} = require('../middlware/jwt')

router.post('/add-product',verfiyToken,productController.addProduct)
router.get('/get',productController.getAllProducts)
router.put('/update-product/:id',productController.updateProduct)
router.delete('/delete-product/:id',productController.deleteProduct)
router.get('/get-sorted-products',productController.sortProduct)
router.get('/get-single/:slug',productController.getSingleProduct)




module.exports = router
