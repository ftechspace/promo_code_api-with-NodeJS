const express = require('express')
const router = express.Router()

// MIDDLEWARE
const check_auth = require('../middleware/check-auth')

// CONTROLLERS PATH
const TripController = require('../controllers/trip')

// USER API
router.post('/', TripController.createTrip)

module.exports = router