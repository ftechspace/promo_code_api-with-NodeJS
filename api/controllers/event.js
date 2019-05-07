const mongoose = require('mongoose');
const moment = require('moment');

// MODELS
const Event = require('../models/event');
const Location = require('../models/location')


// CONTROLLERS
exports.createEvent = (req, res, next) => {
    const name = req.body.name
    const location = req.body.location

    // create location for event
    const eventLocation = new Location({
        _id: new mongoose.Types.ObjectId,
        latitude: '2.878676787',
        longitude: '-1.8967656',
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
            res.status(500).json({
                error: err
            })
        })
}