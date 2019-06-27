
 const request = require('request')
//  mapbox geocode finde latitude and langitude
const geoCode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?types=address&access_token=pk.eyJ1IjoibXVoYW1tYWRiaWxhbDEyIiwiYSI6ImNqd3F1dGpvbTA3aGo0NHA1cjg2cjEwazAifQ.n2PHvLywoH8zMBFm3YvS_Q'
     
    request({url : url, json : true}, (error, response) => {
        console.log(response.body.features[0].center[1])
        console.log(response.body.features[0].center[0])
        if(error){
            callback('unable to connect location service' , undefined)
        }else if( response.body.features.length === 0){
            callback('unabale to FInd location', undefined)
        }else{
            callback(undefined , {
               latitude : response.body.features[0].center[1],
               langitude : response.body.features[0].center[0],
               location : response.body.features[0].place_name
            })
        }
    })
 }

 module.exports = geoCode