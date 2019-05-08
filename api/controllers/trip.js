const mongoose = require('mongoose');
const moment = require('moment');

const axios = require('axios')
// MODELS
const Trip = require('../models/trip');
const Location = require('../models/location')


// CONTROLLERS
exports.createTrip = (req, res, next) => {
    const userId = req.body.userId
    const pick_up = req.body.pickup_location
    const drop_off = req.body.dropoff_location

    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${pick_up}&key=${process.env.API_KEY}`)
        .then(pick_up_result => {
            if (pick_up_result.data && pick_up_result.data.status == 'OK') {

                const geometryPoints = pick_up_result.data.results[0].geometry.location
                const pick_up_loc_lat = geometryPoints.lat
                const pick_up_loc_lng = geometryPoints.lng

                // trip origin
                const tripPickUpLocation = new Location({
                    _id: new mongoose.Types.ObjectId,
                    latitude: pick_up_loc_lat,
                    longitude: pick_up_loc_lng,
                    created: moment().format('YYYY-MM-DD '),
                })
                tripPickUpLocation.save()

                axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${drop_off}&key=${process.env.API_KEY}`)
                    .then(drop_off_result => {
                        if (drop_off_result.data && drop_off_result.data.status == 'OK') {

                            const geometryPoints = pick_up_result.data.results[0].geometry.location
                            const drop_off_loc_lat = geometryPoints.lat
                            const drop_off_loc_lng = geometryPoints.lng

                            // trip destination
                            const tripDropOffLocation = new Location({
                                _id: new mongoose.Types.ObjectId,
                                latitude: drop_off_loc_lat,
                                longitude: drop_off_loc_lng,
                                created: moment().format('YYYY-MM-DD '),
                            })
                            tripDropOffLocation.save()

                            
                            const cost = '95'

                            const trip = new Trip({
                                _id: new mongoose.Types.ObjectId,
                                author: userId,
                                cost: cost,
                                pickup_location: tripPickUpLocation._id,
                                dropoff_location: tripDropOffLocation._id,
                                created: moment().format('YYYY-MM-DD '),
                            })
                            trip.save()
                                .then(trip => {
                                    res.status(201).json({
                                        result: trip,
                                        message: "Trip created"
                                    })
                                })
                                .catch(err => {
                                    res.status(400).json({
                                        error: err
                                    })
                                })
                        }
                    })

            }

        })
}