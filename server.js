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

app.get('weather', handleWeather);
function handleWeather(req, res){
  const jsonData = require('.data/weather.json');
  const result = new Weather (jsonData, req.query);
  res.send(result);
}

function Weather(jsonData, weatherStatus){
  this.
}; 


app.listen(3001,()=> console.log(`Now listening on PORT 3001`));