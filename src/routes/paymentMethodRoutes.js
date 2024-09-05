const express = require('express')
const paymentController = require('../controllers/paymentController')

const router = express.Router()
const imgUpload = require('../helpers/fileUploader')
const { verfiyToken, IsAdmin } = require('../middlware/jwt')


router.post('/add-payment-method', verfiyToken,  paymentController.addPaymentMethod)
router.get('/get-payment-method', paymentController.getPaymentMethods)
router.put('/update-payment-method/:id',verfiyToken,paymentController.updateStatus)
router.get('/get-single-payment-method/:id',verfiyToken,paymentController.getSinglePaymentMethod)

module.exports = router