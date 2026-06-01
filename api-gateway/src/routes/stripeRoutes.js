const express = require('express')
const router = express.Router()
const { createCheckoutSession } = require('../controllers/stripeController')

router.post('/create-checkout', createCheckoutSession)

module.exports = router