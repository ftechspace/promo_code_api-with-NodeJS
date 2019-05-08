const mongoose = require('mongoose');
const moment = require('moment');
const gpl = require( 'google-polyline' )

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
    Promo.updateOne({
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

exports.validatePromo = (req, res, next) => {
    const code = req.body.code
    // const origin = req.body.origin
    // const destinatin = req.body.destinatin

    Promo.findOne({ code: code })
        .populate('event')
        .then(promo => {
            if(promo == null){
                return res.status(400).json({
                    error: 'Promo code does not exist'
                })
            }

            origin = { lat: '0.238982', lng: '-1.328927' }
            destinatin = { lat: '0.238982', lng: '-1.328927' }

            const polyline = gpl.encode([
                [ origin.lat, origin.lng ],
                [ destinatin.lat, destinatin.lng ]
              ])
              
            return res.status(200).json({
                validate_promo: {
                    promo: promo,
                    polyline: polyline,
                    origin: origin,
                    destinatin: destinatin
                },

            })
        })
        .catch(err => {
            return res.status(400).json({
                error: "Could not find promo code"
            })
        })
}