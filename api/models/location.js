const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    latitude: {
        type: String,
        required: false
    },
    longitude: {
        type: String,
        required: false
    },
    created: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Location', locationSchema);