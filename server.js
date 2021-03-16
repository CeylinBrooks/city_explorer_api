'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();
const pg = require('pg');
const { res, req } = require('express');

//APP
const app = express();
app.use(cors());
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.log(error));

const PORT = process.env.PORT || 3001;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const PARKS_API_KEY = process.env.PARKS_API_KEY;
const YELP_API_KEY = process.env.YELP_API_KEY;




// Routes
app.get('/location', handleLocation);
app.get('/weather', handleWeather);
app.get('/parks', handleParks);
app.get('/movies', handleMovies);
app.get('/yelp', handleYelp);

function handleLocation(req, res) {
  const sqlQueryString = 'SELECT * FROM cities WHERE search_query=$1';
  const sqlQueryArrays = [req.query.city];
  client.query(sqlQueryString, sqlQueryArrays)
    .then(result => {
      if (result.rows.length > 0) {
        res.send(result.rows[0]);
      } else {
        const city = req.query.city;
        const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json`;
        superagent.get(url).then(returnedData => {
          const output = new Location(city, req.query.city);
          res.send(output);
          const sqlString = 'INSERT INTO cities (search_query. formatted_query. latitude, longtitude) VALUES($1, $2, $3, $4)';
          const sqlArray = [city, returnedData.body[0].display_name, returnedData.body[0].lat, returnedData.body[0].lon];
          client.query(sqlString, sqlArray).then(() => {
            res.send(output);
          });
        }).catch(error => {
          console.log(error);
          res.status(500).send('Houston we have a problem!');
        });
      }
    });
}


function handleWeather(req, res) {
  let lat = req.query.latitude;
  let lon = req.query.longitude;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  superagent.get(url).then(returnedData => {
    const output = returnedData.body.data.map(weatherInfo => {
      return new Weather(weatherInfo);
    });
    res.send(output);
  }).catch(error => {
    console.log(error);
    res.status(500).send('Houston we have a problem!');
  });
}

function handleParks(req, res) {
  const park = req.query.formattted_query;
  const url = `https://developer.nps.gov/api/v1/parks?limit=2&start=0&q=${park}&sort=&api_key=${PARKS_API_KEY}`;
  superagent.get(url)
    .then(returnedPark => {
      const parksArray = returnedPark.body.data;
      const output = parksArray.map(parkValue => new Park(parkValue));
      res.send(output);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Houston we have a problem!');
    });
}

function handleMovies(req, res) {
  const movie = req.query.search_query;
  const url = `https://api.themoviedb.org/3/movie/550?api_key=${PARKS_API_KEY}&query=${movie}`;
  superagent.get(url)
    .then(returnedData => {
      const movieArray = returnedData.body.results;
      const output = movieArray.map(movie => new Movie(movie));
      res.send(output);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Houston we have a problem!');
    });
}

function handleYelp(req, res) {
  const offset = (req.query.page - 1) * 5;
  const lat = req.query.latitude;
  const lon = req.query.longitude;
  const url = `https://api.yelp.com/v3/businesses/search?term=restaurant&limit=5&latitude=${lat}&longitude=${lon}&offset=${offset}`;
  superagent.get(url).set('authorization', `bearer ${YELP_API_KEY}`)
    .then(result => {
      const restaurantArray = result.body.businesses;
      const output = restaurantArray.map(businesses => new Yelp(businesses));
      res.send(output);
    }).catch(error => {
      console.log(error);
      res.status(500).send('Houston we have a problem!');
    });
}

//Objects

function Location(locationData, cityDescrip) {
  this.search_query = cityDescrip;
  this.formattted_query = locationData[0].display_name;
  this.latitude = locationData[0].lat;
  this.longitude = locationData[0].lon;
}

function Weather(jsonData, weatherStatus) {
  this.search_query = jsonData.weather.desription;
  this.formattted_query = weatherStatus;
  this.latitude = jsonData.lat;
  this.longitude = jsonData.lon;

}

function Movie(movieData) {
  this.title = movieData.original_title;
  this.overview = movieData.overview;
  this.average_votes = movieData.vote_average;
  this.total_votes = movieData.vote_count;
  this.image_url = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieData.poster_path}`;
  this.popularity = movieData.popularity;
  this.released_on = movieData.release_date;
}

function Park(parkInformation) {
  this.name = parkInformation.name;
  this.address = `${parkInformation}.addresses[0].line1} ${parkInformation[0].city} ${parkInformation}.addresses[0].stateCode} ${parkInformation.addresses[0].postalCode}`;
  this.fee = parkInformation = parkInformation.desription;
  this.url = parkInformation.url;
}


function Yelp(yelpStuff) {
  this.name = yelpStuff.name;
  this.image_url = yelpStuff.image_url;
  this.price = yelpStuff.price;
  this.rating = yelpStuff.rating;
  this.url = yelpStuff.url;

}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
  });





