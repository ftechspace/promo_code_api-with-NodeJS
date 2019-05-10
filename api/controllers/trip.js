const mongoose = require('mongoose');
const moment = require('moment');

const axios = require('axios')

const Utils = require('../partials/utils')
// MODELS
const Trip = require('../models/trip');
const Location = require('../models/location')


// CONTROLLERS
exports.createTrip = async (req, res, next) => {
    const userId = req.body.userId
    const pick_up = req.body.pickup_location
    const promo_code = req.body.promo_code
    const drop_off = req.body.dropoff_location

    const pick_up_result = await Utils.getLocationPointCodinate(pick_up)
    const drop_off_result = await Utils.getLocationPointCodinate(drop_off)
    console.log('create trip', drop_off_result, pick_up_result)
    if (pick_up_result.status == 'OK' && drop_off_result.status == 'OK') {

         // trip origin
        const pickUpGeometryPoints = pick_up_result.results[0].geometry.location
        const pick_up_loc_lat = pickUpGeometryPoints.lat
        const pick_up_loc_lng = pickUpGeometryPoints.lng

        const tripPickUpLocation = new Location({
            _id: new mongoose.Types.ObjectId,
            latitude: pick_up_loc_lat,
            longitude: pick_up_loc_lng,
            created: moment().format('YYYY-MM-DD '),
        })
        tripPickUpLocation.save()

        // trip destination
        const dropOffGeometryPoints = drop_off_result.results[0].geometry.location
        const drop_off_loc_lat = dropOffGeometryPoints.lat
        const drop_off_loc_lng = dropOffGeometryPoints.lng

        const tripDropOffLocation = new Location({
            _id: new mongoose.Types.ObjectId,
            latitude: drop_off_loc_lat,
            longitude: drop_off_loc_lng,
            created: moment().format('YYYY-MM-DD '),
        })
        tripDropOffLocation.save()


        // trip distance and cost
        const trip_distance = Utils.getDistance(tripPickUpLocation, tripDropOffLocation)
        var trip_cost = Utils.getCost(trip_distance)
        console.log(`>>>>>>>> Main cost GHS ${trip_cost} >>>>>>>>>`)
        // check to apply promo
        if (promo_code) {
            console.log('code check',tripDropOffLocation, tripPickUpLocation, promo_code)
            const  origin_distance_from_event = await Utils.validatePromoWithRadius(tripPickUpLocation, promo_code)
            const  destination_distance_from_event = await Utils.validatePromoWithRadius(tripDropOffLocation, promo_code)

            if(parseFloat(destination_distance_from_event.distance) <= parseFloat(destination_distance_from_event._promo.radius)){
                trip_cost = trip_cost - destination_distance_from_event._promo.amount
                console.log('destination')
            } else if (parseFloat(origin_distance_from_event.distance) <= parseFloat(origin_distance_from_event._promo.radius)){
                trip_cost = trip_cost - origin_distance_from_event._promo.amount
                console.log('origin')
            }
        }
        console.log(`>>>>>>>> After Promo is applied  GHS ${trip_cost} >>>>>>>>>`)
        const trip = new Trip({
            _id: new mongoose.Types.ObjectId,
            author: userId,
            cost: trip_cost,
            distance: trip_distance,
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
}