const express = require('express')
const router = express.Router()

// MIDDLEWARE
const checkAuth = require('../middleware/check-auth')

// CONTROLLERS PATH
const promoController = require('../controllers/promo')

router.post('/', promoController.createPromo)
router.get('/', promoController.getAllPromos)
router.get('/active_promos', promoController.getAllActivePromos)
router.get('/deactivate_promo/:promoId', promoController.deactivatePromo)

module.exports = router