const express = require('express')

const router = express.Router()
const productConfigController = require('../controllers/productConfigController')
const {verfiyToken} = require('../middlware/jwt')
router.post('/add-product-config',verfiyToken,productConfigController.addProductConfig)


// get product variations 

router.get('/get-product-config/:product_id',verfiyToken,productConfigController.getsingleProductVariations)
router.get('/get',verfiyToken,productConfigController.getAllproductVariations)

router.put('/update-product-config/:id',verfiyToken,productConfigController.updateProductVariation)
router.get('/get-single-variant/:id',verfiyToken,productConfigController.getSingleVariant)
router.delete('/delete-variant/:id',verfiyToken,productConfigController.deleteVariant)

module.exports = router