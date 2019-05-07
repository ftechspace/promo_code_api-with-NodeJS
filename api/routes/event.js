const express = require('express')
const router = express.Router()

// MIDDLEWARE
const check_auth = require('../middleware/check-auth')

// CONTROLLERS PATH
const EventController = require('../controllers/event')

// USER API
router.post('/', EventController.createEvent)

module.exports = router