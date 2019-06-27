///////FORECAST FUNCITON ///////
const request = require('request')
const foreCaste = (latitude ,langitude, callback) => {
 forecastURL = 'https://api.darksky.net/forecast/1c1f3a994b8f237b48c4655de6f93a29/'+langitude+','+latitude

 request({url : forecastURL, json: true}, (error, response) => {
      if(error){
          callback('Can not Connect to internet', undefined)
      }else if(response.body.error){
          callback('Can not find Location',undefined)
      }
      else{
          callback(undefined ,'area : '+ response.body.timezone + response.body.currently.summary+' current temperture is '+ response.body.currently.temperature+'F and chance of rain is '+ response.body.currently.precipProbability +'%')
      }
 })
}

module.exports = foreCaste