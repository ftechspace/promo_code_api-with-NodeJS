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

exports.getLocationPointCodinate = async (location) => {
    // console.log(location)
    try {
        const response = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBp2ub9miDJkwHwAMA2lMpXvcGeT_44QYw`)
        return response.data
    } catch (error) {
        console.log('error', error)
    }
    
    // .then(result => {
    //     // console.log(result.data.results[0].geometry.location)
    //     return result.data.results[0].geometry.location
    // })
    // .catch(err => {
    //     return err
    // })
}