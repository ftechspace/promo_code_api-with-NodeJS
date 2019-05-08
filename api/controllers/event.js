const mongoose = require('mongoose');
const moment = require('moment');

const axios = require('axios')

// MODELS
const Event = require('../models/event');
const Location = require('../models/location')

const Utils = require('../partials/utils')

// CONTROLLERS
exports.createEvent = (req, res, next) => {
    const name = req.body.name
    const location = req.body.location

    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.API_KEY}`)
        .then(result => {
            if (result.data && result.data.status == 'OK') {

                const geometryPoints = result.data.results[0].geometry.location
                const loc_lat = geometryPoints.lat
                const loc_lng = geometryPoints.lng

                // create location for event
                const eventLocation = new Location({
                    _id: new mongoose.Types.ObjectId,
                    latitude: loc_lat,
                    longitude: loc_lng,
                    created: moment().format('YYYY-MM-DD '),
                })
                eventLocation.save()

                // create event
                const event = new Event({
                    _id: new mongoose.Types.ObjectId,
                    name: name,
                    location: eventLocation._id,
                    created: moment().format('YYYY-MM-DD '),
                });
                event.save()
                    .then(event => {
                        res.status(201).json({
                            event: {
                                id: event._id,
                                name: event.name,
                                location: eventLocation,
                                created: event.created
                            }
                        })
                    })
                    .catch(err => {
                        res.status(400).json({
                            error: err
                        })
                    })
            }

        })
        .catch(err => {
            res.status(400).json({
                message: err
            })
           
        })





}