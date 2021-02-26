'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();
const pg = require('pg');

//APP
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.log(error));


const app = express();
app.use(cors());




const PORT = process.env.PORT || 3001;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const PARKS_API_KEY = process.env.PARKS_API_KEY;
// console.log(process.env);


app.get('/weather', handleWeather);
app.get('/location', handleLocation);
//app.get('/yelp', handleYelp);


// Routes

function handleLocation(req, res){
  const city = req.query.city;
  const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json`;
  superagent.get(url).then(returnedData => {
    let city = returnedData.body[0];
    console.log(city);
    const output = new Location(city, req.query.city);
    res.send(output);
  }).catch(error => {
    console.log(error);
    res.status(500).send('Houston we have a problem!');
  });
}

function handleWeather(req, res){
  console.log(req.query);
  let lat = req.query.latitude;
  let lon = req.query.longitude;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  superagent.get(url).then(returnedWeather => {
    console.log(returnedWeather.body.data);
    // const output = new Weather(returnedWeather.body,req.query. ?? );
    const output = {test: 'test'};
    res.send(output);
  }).catch(error => {
    console.log(error);
    res.status(500).send('Houston we have a problem!');
  });
}


// function handleParks(req, res){
//   const park = req.query.park;
//   const url = ``;
//   superagent.get(url).then(returnedPark => {
//     console.log(returnedPark.body);
//     // const output = new Park(returnedPark.body,req.query. ?? );
//     const output = {test: 'test'};
//     res.send(output);
//   }).catch(error => {
//     console.log(error);
//     res.status(500).send('Houston we have a problem!');
//   });
// }



// app.get('/restaurants', restaurantHandler);

// function restaurantHandler(req,res){
  //   const restaurantJSON = require('.data/restaturants.json');
  
  //   const output = [];
  //   for (let i = 0; i < restaurantJSON.nearby_restaurants.length; i++){
    //     output.push(new Restaurant(restaurantJSON.nearby_restaurants[i].restaurant));
    //   }
    //   res.send(output);
    // }
    
    // function Restaurant(object){
      //   this.name = object.name;
      //   this.area = object.location.locality_verbose;
      //   this.park = object.cuisines;
    }
    
    function Location (locationData, cityDescrip){
      this.search_query = cityDescrip;
      this.formattted_query = locationData.display_name;
      this.latitude = locationData.lat;
      this.longitude = locationData.lon;
    }
    function Weather(jsonData, weatherStatus){
        this.search_query = jsonData.weather.desription;
        this.formattted_query = weatherStatus;
        this.latitude = jsonData.lat;
        this.longitude = jsonData.lon;

      };
    
    
client.connect()
  .then(() => {
    app.listen(PORT,()=> console.log(`Now listening on ${PORT}`));
  });



