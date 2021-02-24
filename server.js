'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const { response } = require('express');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env || 3001;
const LOCATION_API_KEY = process.env.LOCATION_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
console.log(process.env);



app.get('/weather', handleWeather);
app.get('/location', handleLocation)
//app.get('/yelp', handleYelp);


// Routes

function handleLocation(req, res){
  const city = req.query.city;
  const url = ``;
  superagent.get(url).then(returnedData => {
    console.log(returnedData.body);
    const output = new Location(returnedData.body, req.query.city);
    response.send(output);
  }).catch(error => {
    console.log(error);
    response.status(400).send('Houston we have a problem!');
  });
}

function handleWeather(req, res){
  const park = req.query.weather;
  const url = ``;
  superagent.get(url).then(returnedWeather => {
    console.log(returnedWeather.body);
    const output = new Park(returnedWeather.body,req.query. ?? );
    response.send(output);
  }).catch(error => {
    console.log(error);
    response.status(500).send('Houston we have a problem!');
  })
};


function handleParks(req, res){
  const park = req.query.park;
  const url = ``;
  superagent.get(url).then(returnedPark => {
    console.log(returnedPark.body);
    const output = new Park(returnedPark.body,req.query. ?? );
    response.send(output);
  }).catch(error => {
    console.log(error);
    response.status(500).send('Houston we have a problem!');
  })
;}

//   console.log(req.query);
//   const locationData = require('.data/location.json');

//   const output = new Location(locationData, req.query.city);
//   res.send (output);
// }
}

function Location (locationData, cityDescrip){
  this.search_query = cityName;
  this.formattted_query = locationData[0].display_name;
  this.latitude = locationData[0].lat;
  this.longitude = locationData[0].lon;
}

app.get('/restaurants', restaurantHandler);

function restaurantHandler(req,res){
  const restaurantJSON = require('.data/restaturants.json');

  const output = [];
  for (let i = 0; i < restaurantJSON.nearby_restaurants.length; i++){
    output.push(new Restaurant(restaurantJSON.nearby_restaurants[i].restaurant))
  }
  res.send(output);
}

function Restaurant(object){
  this.name = object.name;
  this.area = object.location.locality_verbose;
  this.cuisines = object.cuisines;
}

// app.get('weather', handleWeather);
// function handleWeather(req, res){
//   //console.log
//   const jsonData = require('.data/weather.json');
//   for (let i = 0; i < )
//   const result = new Weather (jsonData, req.query);
//   res.send(result);
// }

// function Weather(jsonData, weatherStatus){
//   this.forecast = jsonData.weather.desription;
//   this.
//   this.
// }; 


//function handleYelp(req,res)

app.listen(3001,()=> console.log(`Now listening on PORT 3001`));


