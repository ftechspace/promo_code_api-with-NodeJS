const express = require('express')
const router = express.Router()

// MIDDLEWARE
const checkAuth = require('../middleware/check-auth')

// CONTROLLERS PATH
const promoController = require('../controllers/promo')

router.post('/', promoController.createPromo)
router.get('/', promoController.getAllPromos)
router.get('/active_promos', promoController.getAllActivePromos)
router.put('/deactivate_promo/:promoId', promoController.deactivatePromo)
router.put('/update_promo_radius/:promoId', promoController.changePromoRadius)
router.post('/validate_promo', promoController.validatePromo)



module.exports = router