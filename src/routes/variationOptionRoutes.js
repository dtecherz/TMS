const express = require('express')

const router = express.Router()
const {verfiyToken} = require('../middlware/jwt')
const variationOptionController = require('../controllers/variationOptionController')



router.post('/add-option',verfiyToken,variationOptionController.addVariationOption)
router.put('/update-variation/:id',verfiyToken,variationOptionController.updateVariationOption)
router.get('/get-all-variations',verfiyToken,variationOptionController.getAllVariationOptions)
router.delete('/delete-variation/:id',verfiyToken,variationOptionController.deleteVariationOption)
router.get('/get-single',verfiyToken,variationOptionController.getSingleVariationOptions)



// get single varoiation option based on variation id 

router.get('/get/:variation_id',verfiyToken,variationOptionController.getVariationOptions)

router.get('/get-options/:name',verfiyToken,variationOptionController.VariationOptionBasedOnName)










module.exports = router
