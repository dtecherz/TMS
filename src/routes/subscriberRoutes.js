const express = require('express')

const router = express.Router()
const subscriberController = require('../controllers/subscriberController')

router.post('/subscribe',subscriberController.addSubscriber)
router.get('/get-subscribe',subscriberController.getSubscribers)

module.exports = router