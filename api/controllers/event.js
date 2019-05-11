const mongoose = require('mongoose');
const moment = require('moment');
// MODELS
const Event = require('../models/event');
const Location = require('../models/location')
//PARTIALS
const Utils = require('../partials/utils')
// CONTROLLERS
exports.createEvent = async (req, res, next) => {
    const name = req.body.name
    const location = req.body.location
    const event_radius = req.body.event_radius
    
    const data = await Utils.getLocationPointCodinate(location)
    if (data.status == 'OK') {
        const geometryPoints = data.results[0].geometry.location
        const loc_lat = geometryPoints.lat
        const loc_lng = geometryPoints.lng
        // create location for event
        const eventLocation = await new Location({
            _id: new mongoose.Types.ObjectId,
            latitude: loc_lat,
            longitude: loc_lng,
            created: moment().format('YYYY-MM-DD '),
        }).save()
        // create event
        const event = await new Event({
            _id: new mongoose.Types.ObjectId,
            name: name,
            location: eventLocation._id,
            radius: event_radius,
            created: moment().format('YYYY-MM-DD '),
        }).save()
        
        if(event._id) {
          return res.status(201).json({
              event: {
                  id: event._id,
                  name: event.name,
                  location: eventLocation,
                  created: event.created
              }
          })
        }
        return res.status(400).json({
            message: "could not  create event"
        })
    }
    return res.status(400).json({
        message: "could not  create event"
    })
}
