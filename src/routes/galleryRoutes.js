const express = require('express')
const router = express.Router()
const galleryControllers = require('../controllers/galleryController')
const imgUpload = require('../helpers/fileUploader')
const {verfiyToken} = require('../middlware/jwt')

router.post('/add-images', verfiyToken, imgUpload, galleryControllers.addImges)

router.get('/get-images',verfiyToken,galleryControllers.getAllImages)

router.post('/embed',verfiyToken,galleryControllers.embedVideoImages)





module.exports = router