const express = require('express')
const router = express.Router()

// CONTROLLERS PATH
const EventController = require('../controllers/event')

// USER API
router.post('/', EventController.createEvent)

module.exports = router