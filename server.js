'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env || 3001;
console.log(process.env);

app.get('/data', dataCallback);

function dataCallback(request, response){
  response.send(weath);
}

// Routes
app.get ('location', handleLocation);
function handleLocation(req, res){
  console.log(req.query);
  const locationData = require('.data/location.json');

  const output = new Location(locationData, req.query.city);
  res.send (output);
}

function Location (locationData, cityDescrip){
  this.search_query = cityName;
  this.formattted_query = locationData[0].display_name;
  this.latitude = locationData[0].lat;
  this.longitude = locationData[0].lon;
}

app.get('weather', handleWeather);
function handleWeather(req, res){
  //console.log
  const jsonData = require('.data/weather.json');
  const result = new Weather (jsonData, req.query);
  res.send(result);
}

function Weather(jsonData, weatherStatus){
  this.
  this.
  this.
}; 





app.listen(3001,()=> console.log(`Now listening on PORT 3001`));