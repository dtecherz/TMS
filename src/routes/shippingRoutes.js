const express = require('express')
const router = express.Router()

const shippingController = require('../controllers/shipingController')
const { verfiyToken } = require('../middlware/jwt')

router.post('/add-shipping-method',verfiyToken,shippingController.addShippingMethod)
router.get('/get-shiping-method',shippingController.getAllShippingMethods)


module.exports = router