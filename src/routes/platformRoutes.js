const router = require('express').Router()
const platformController = require('../controllers/platformController')


router.get('/product-list', platformController.productListPage)

router.get('/search', platformController.productSearch)


// ad icons in platform 

router.post('/add-icon',platformController.addSocialLinksData)

router.get('/get-icon',platformController.getSocialIcons)


// get active collection 

router.get('/get-active-collection',platformController.activeCollections)





module.exports = router