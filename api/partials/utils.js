const axios = require('axios')

exports.uniqCode = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.getDistanceAndCost = (origin, destination) => {
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
    console.log(trip_distance)

    // calculate cost then return distance and cost
    const price_per_km = 0.5
    const time_to_distination = trip_distance * price_per_km
    const price_per_min = 0.2

    const cost = trip_distance * price_per_km + time_to_distination * price_per_min + 5

    if(trip_distance <= 5.00){
        returnObj = {
            cost: '5.00',
            distance: trip_distance
        }
       return returnObj
    }else{
        returnObj = {
            cost: cost,
            distance: trip_distance
        }
       return returnObj
    }

}

// exports.getLocationPointCodinate = async (location) => {
//     // console.log(location)
//     try {
//         const response = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBp2ub9miDJkwHwAMA2lMpXvcGeT_44QYw`)
//         return response.data
//     } catch (error) {
//         console.log('error', error)
//     }

//     // .then(result => {
//     //     // console.log(result.data.results[0].geometry.location)
//     //     return result.data.results[0].geometry.location
//     // })
//     // .catch(err => {
//     //     return err
//     // })
// }