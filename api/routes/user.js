const express = require('express')
const router = express.Router()

// CONTROLLERS PATH
const UserController = require('../controllers/user')

// USER API
router.post('/signup', UserController.userSignUp)

module.exports = router