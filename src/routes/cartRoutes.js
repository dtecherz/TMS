const express = require('express')

const router = express.Router()
const {verfiyToken} = require('../middlware/jwt')
const cartController = require('../controllers/cartController')
router.post('/add-to-cart/:product_id',verfiyToken,cartController.createCart)

// user cart items 
router.get('/get-cart-items',verfiyToken,cartController.getUserCarts)

router.post('/delete-cart-item',verfiyToken,cartController.deleteCartItem)


// get localy carts 

router.post('/get-carts',cartController.getCarts)

module.exports= router