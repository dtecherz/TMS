const express = require('express')
const router = express.Router()

const shippingController = require('../controllers/shipingController')
const { verfiyToken } = require('../middlware/jwt')

router.post('/add-shipping-method',verfiyToken,shippingController.addShippingMethod)
router.get('/get-shiping-method',shippingController.getAllShippingMethods)
router.get('/get-single/:id',verfiyToken,shippingController.getSingleShippingMethod)
router.delete('/delete-shipping-method/:id',verfiyToken,shippingController.deleteShippingMethod)
router.put('/update-shipping-method/:id',verfiyToken,shippingController.updateShippingMethod)


module.exports = router