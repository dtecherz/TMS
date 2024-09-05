const express = require('express')

const router = express.Router()

const orderController = require('../controllers/orderController')
const { verfiyToken, IsAdmin } = require('../middlware/jwt')
const imgUpload = require('../helpers/fileUploader')


router.post('/place-order',verfiyToken, imgUpload,orderController.shopOrder)

// get all order admin 
router.get('/get-all-orders',verfiyToken,orderController.getAllOrders)

// get single order 
router.get('/get-single-order/:id',verfiyToken,orderController.getSingleOrders)

// get single order with detail 
router.get('/get-single-order-detail/:id',orderController.getSingleOrderDetail)



// update order status 

router.put('/update-order-status/:id',verfiyToken,orderController.updateOrderStatus)



// get user order 

router.get('/get-user-order',verfiyToken,orderController.getUserOrders)

// get guesy user order 


router.get('/get-guest-user-order',orderController.getGuestUserOrders)



// guest order place 

router.post('/place-order-guest',imgUpload,orderController.GuestshopOrder)

module.exports = router