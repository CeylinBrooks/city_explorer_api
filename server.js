'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env || 3001;
const LOCATION_API_KEY = process.env.LOCATION_API_KEY;
console.log(process.env);

app.get('/data', dataCallback);

function dataCallback(request, response){
  response.send(weath);
}

app.get('/weather', handleWeather);
app.get('/location', handleLocation)
app.get('/yelp', handleYelp);


function handleWeather(req, res){

// Routes
app.get ('location', handleLocation);
function handleLocation(req, res){
  const city = req.query.city;
  const url = ``;
  superagent.get(url).then(returnedData => {
    console.log(returnedData.body);
    const output = new Location(returnedData.body, req.query.city);
  });

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

app.get('weather', handleWeather);
function handleWeather(req, res){
  //console.log
  const jsonData = require('.data/weather.json');
  for (let i = 0; i < )
  const result = new Weather (jsonData, req.query);
  res.send(result);
}

function Weather(jsonData, weatherStatus){
  this.forecast = jsonData.weather.desription;
  this.
  this.
}; 


function handleYelp(req,res)

app.listen(3001,()=> console.log(`Now listening on PORT 3001`));