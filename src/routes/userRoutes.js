const express = require('express');
const router = express.Router()

const userController = require('../controllers/userController')
const { verfiyToken, IsAdmin } = require('../middlware/jwt')




router.post('/register', userController.register)
router.post('/register-guest', userController.addGuestUser)
// router.post('/register-guest', userController.addGuestUser)

router.post('/login', userController.login)
router.get('/get-login-user', verfiyToken, userController.getSingleUser)
router.put('/update-password', verfiyToken, userController.updateUserDetails)
router.get('/get',verfiyToken,IsAdmin, userController.getAllUsers)




module.exports = router