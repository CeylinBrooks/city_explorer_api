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

app.get('/weather', handleWeather);
app.get('/location', handleLocation)
app.get('/yelp', handleYelp);

function handleWeather(req, res){
  const jsonData = require('.data/weather.json');
  for ()
  const result = new Weather (jsonData, req.query);
  res.send(result);
}

function Weather(jsonData, weatherStatus){
  this.forecast = jsonData.weather.desription;
  this.
  this.
}; 

//

// ```
// [
//   {
//     "forecast": "Partly cloudy until afternoon.",
//     "time": "Mon Jan 01 2001"
//   },
//   {
//     "forecast": "Mostly cloudy in the morning.",
//     "time": "Tue Jan 02 2001"
//   },
//   ...
// ]
// ```
//
function handleLocation(req,res){
    this.search_query = 'seattle';
    this.formatted_query = "Seattle, WA, USA";
    this.latitude = '47.606210';
    this.longitude = '-122.332071';
 
}

function handleYelp(req,res)

app.listen(3001,()=> console.log(`Now listening on PORT 3001`));