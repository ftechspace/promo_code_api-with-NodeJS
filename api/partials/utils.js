const axios = require('axios')

const googleapis = require('../../googleapis.json')
const PromoController = require('../controllers/promo')

exports.uniqCode = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.getCost = (trip_distance) => {
    // calculate cost
    const price_per_km = 2.00
    const time_to_distination = trip_distance * price_per_km
    const price_per_min = 1.00
    const cost = trip_distance * price_per_km + time_to_distination * price_per_min + 5.00
    return cost
}


exports.getDistance = (origin, destination) => {
    // Converts numeric degrees to radians
    if (typeof (Number.prototype.toRad) === "undefined") {
        Number.prototype.toRad = function () {
            return this * Math.PI / 180;
        }
    }

    decimals = 2;
    const earthRadius = 6371; // km
    lat1 = parseFloat(origin.latitude);
    lat2 = parseFloat(destination.latitude);
    lon1 = parseFloat(origin.longitude);
    lon2 = parseFloat(destination.longitude);


    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = earthRadius * c;
    const trip_distance = Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals); //distance in kilometers.
    return trip_distance
}

exports.validatePromoWithRadius = async (trip_point, promo_code) => {
    // calculate cost
    const _promo = await PromoController.getOnePromo(promo_code)
    const distance = this.getDistance(trip_point, _promo.event.location)
    return {distance,_promo}

}

exports.getLocationPointCodinate = async (location) => {
    try {
        if(process.env.NODE_ENV == 'test'){
            return googleapis
        }else{
            const {data} = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.API_KEY}`)
            return data
        }
    } catch (error) {
        return error
    }
}
