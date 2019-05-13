const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment');

// MODELS
const User = require('../models/user');


// CONTROLLERS
exports.userSignUp = async (req, res, next) => {
    const userEmail = req.body.email
    const userPassword = req.body.password

    console.log('came in')
    const _user = await User.find({
        email: userEmail
    })
    console.log('did you find your?', _user)
    if (_user.length >= 1) {
        return res.status(409).json({
            message: 'Email already exist'
        })
    }
    console.log('did not find user so create')
    bcrypt.hash(userPassword, 10, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        const user = await new User({
            _id: new mongoose.Types.ObjectId,
            email: userEmail,
            password: hash,
            created: moment().format('YYYY-MM-DD '),
        }).save()
        const token = await jwt.sign({
                email: user.email,
                userId: user._id
            },
            process.env.JWT_KEY, {
                expiresIn: "3h"
            })
        if (user && token) {
            return res.status(201).json({
                profile: {
                    id: user._id,
                    email: user.email,
                    token: token,
                    created: user.created
                }
            })
        }
        return res.status(404).json({
            error: err
        })
    })
}