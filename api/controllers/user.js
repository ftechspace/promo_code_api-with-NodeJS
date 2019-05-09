const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment');

// MODELS
const User = require('../models/user');


// CONTROLLERS
exports.userSignUp = (req, res, next) => {
    const userEmail = req.body.email
    const userPassword = req.body.password
    
    User.find({
            email: userEmail
        })
        .then(email => {
            if (email.length >= 1) {
                return res.status(409).json({
                    message: 'Email already exist'
                })
            } else {
                bcrypt.hash(userPassword, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            email: userEmail,
                            password: hash,
                            created: moment().format('YYYY-MM-DD '),
                        });
                        const token = jwt.sign({
                                email: user.email,
                                userId: user._id
                            },
                            process.env.JWT_KEY, {
                                expiresIn: "3h"
                            })
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    profile: {
                                        id: result._id,
                                        email: result.email,
                                        token: token,
                                        created: result.created
                                    }
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}


// exports.userLogin = (req, res, next) => {
//     const userEmail = req.body.email
//     const userPassword = req.body.password
//     User.find({
//             email: userEmail,
//         })
//         .populate('body_measurement')
//         .then(user => {
//             if (user.length < 1) {
//                 return res.status(401).json({
//                     message: 'Auth failed'
//                 });
//             }
//             BodyMeasurement.find({
//                     author: user[0]._id
//                 })
//                 .then(rest => {
//                     bcrypt.compare(userPassword, user[0].password, (err, result) => {
//                         if (err) {
//                             return res.status(401).json({
//                                 message: 'Auth failed'
//                             })
//                         }
//                         if (result) {
//                             const token = jwt.sign({
//                                     email: user[0].email,
//                                     userId: user[0]._id
//                                 },
//                                 process.env.JWT_KEY, {
//                                     expiresIn: "1h"
//                                 })
//                             return res.status(200).json({
//                                 message: 'User Logged In Successful',
//                                 token: token,
//                                 profile: user[0],
//                                 body_measurement: rest[0]
//                             })
//                         }
//                         return res.status(401).json({
//                             message: 'Auth failed'
//                         })
//                     })
//                 })

//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: err
//             })
//         })
// }