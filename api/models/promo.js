const mongoose = require('mongoose');

const promoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    active: {
        type: Boolean,
        require: true
    },
    expiry_date: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Promo', promoSchema);