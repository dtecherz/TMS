const express = require('express')
const router =  express.Router()
const collectionController = require('../controllers/collectionController')
const {verfiyToken} = require('../middlware/jwt')



router.post('/add-collection',verfiyToken,collectionController.createColection)
router.get('/get',collectionController.getAllCollection)
router.get('/get-single/:slug',collectionController.getSingleCollection)
router.put('/update-collection/:id',verfiyToken,collectionController.updateCollection)
router.delete('/delete-collection/:id',verfiyToken,collectionController.deleteCollection)


module.exports= router
