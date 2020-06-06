const request = require('request');
const cfg = require('../config');

// Geocoding information
const geocode = (address, callback) => {
    var geo_url = cfg.geo_url;
    geo_url = geo_url.replace("{address}", address);

    request({url: geo_url, json: true}, (err, { body })=> {
        if(err){
            callback("Unable to connect to the location service.", undefined);
        }
        else if(body.message){
            callback("Unable to find the location. Error message: "+body.message, undefined);
        }
        else if(body.features.length===0){
            callback("Unknown location in the search.", undefined);
        }
        else{
            info = body.features[0];
            var [longitude, latitude] = info.center;
            var place_name = info.place_name;
            callback(undefined, {
                    latitude, 
                    longitude, 
                    location: place_name
            })
        }
    });
}

module.exports = geocode;