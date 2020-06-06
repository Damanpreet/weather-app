const express = require('express');
const path = require('path');
var hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Express app
const app = express();
const port = process.env.PORT || 3000; 

// paths for express config
const publicDir = path.join(__dirname, '../public');
const hbsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials')

// setup static directory
app.use(express.static(publicDir));

// setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', hbsDir);
hbs.registerPartials(partialsDir);

app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        createdBy: 'Damanpreet'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me!',
        createdBy: 'Damanpreet'
    });
});

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({ error: 'Please provide a location.'});
    };

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if(err){
            return res.send({ error: err});
        }
        forecast(latitude, longitude, location, (err, forecastInfo)=>{
            if(err){
                return res.send({ error: err});
            }
            res.send({forecast: forecastInfo, location, address: req.query.address}); 
        });
    });
});

// All other routes will load this.
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 Page!',
        page: "Page",
        createdBy: "Damanpreet"
    });
})

app.listen(port, ()=>{
    console.log("Server is up on port "+port+".");
});
