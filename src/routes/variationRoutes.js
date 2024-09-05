const express = require('express')

const router = express.Router()
const {verfiyToken} =require('../middlware/jwt')
const variationController = require('../controllers/VariationController')

router.post('/add-variation',verfiyToken,variationController.addVariation)
router.put('/update-variation/:id',verfiyToken,variationController.updateVriation)
router.get('/get',verfiyToken,variationController.getAllVariations)
router.get('/get-single/:id',verfiyToken,variationController.getsingleVariation)





module.exports = router
