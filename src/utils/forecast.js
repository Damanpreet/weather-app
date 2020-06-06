const cfg = require('../config');
const request = require('request');

// Weather information
const forecast = (lat, long, location, callback) => {
    var weather_url = cfg.weather_url;
    weather_url = weather_url.replace('{lat}', lat).replace('{lon}', long).replace('{units}', 'metric');

    request({url: weather_url, json: true}, (err, { body })=>{
        if (err){
            callback("Unable to connect to the Weather service.", null);
        }
        else if(body.cod){
            callback("Unable to find the location.", null);
        }
        else{
            const weather = body.current;
            const cloudy = (weather.cloudy === 0) ? ' not' : ''
            callback(null, weather.weather[0].description + " It is currently " + weather.temp + " degrees in "+location+". It is" + cloudy + " going to be cloudy today");
        }
    });
}

module.exports = forecast;