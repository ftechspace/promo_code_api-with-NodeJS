const mongoose = require('mongoose');
const moment = require('moment');

// MODELS
const Promo = require('../models/promo');

const Utils = require('../partials/utils')

// CONTROLLERS
exports.createPromo = (req, res, next) => {
    const eventId = req.body.event_id
    const amount = req.body.amount
    const expiry_date = req.body.expiry_date

    // create promo code
    const promo = new Promo({
        _id: new mongoose.Types.ObjectId,
        event: eventId,
        code: Utils.uniqCode(),
        amount: amount,
        active: true,
        expiry_date: expiry_date,
        created: moment().format('YYYY-MM-DD '),
    })
    promo.save()
        .then(promo => {
            res.status(201).json({
                promo: {
                    id: promo._id,
                    code: promo.code,
                    amount: promo.amount,
                    event: promo.event,
                    active: promo.active,
                    expiry_date: promo.expiry_date,
                    created: promo.created
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.getAllActivePromos = (req, res, next) => {
    Promo.find({
            active: true
        })
        .sort({
            created: "desc"
        })
        .populate('event')
        .then(promos => {
            res.status(200).json({
                count: promos.length,
                promos: promos
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
}

exports.getAllPromos = (req, res, next) => {
    Promo.find()
        .sort({
            created: "desc"
        })
        .populate('event')
        .then(promos => {
            res.status(200).json({
                count: promos.length,
                promos: promos
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
}

exports.deactivatePromo = (req, res, next) => {
    const promoId = req.params.promoId
    Promo.update({
            _id: promoId
        }, {
            $set: {
                active: false
            }
        })
        .populate('event')
        .then(promo => {
            res.status(200).json({
                message: "promo has been deactivated"
            })
        })
        .catch(err => {
            res.status(400).json({
                error: "Could not deactivated the promo"
            })
        })
}