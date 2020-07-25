'use strict';

require('dotenv').config();

const express = require('express');
// require pg
const pg = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// getting client object from pg
const client = new pg.Client(process.env.DATABASE_URL);

// allmovies - get all movies from database
app.get('/allmovies',hanleAllMoviesRequest);

function hanleAllMoviesRequest(request,response){
  getAllMoviesFromDB().then(data => {
    response.send(data);
  });
}

function getAllMoviesFromDB(){
  let SQL = 'SELECT * FROM MOVIE;';
  return (client.query(SQL).then(result => {
    return result.rows;
  }));

}

// /movie?genre=name
app.get('/movie',hanleMovieRequest);

function hanleMovieRequest(request,response){
  let genre = request.query.genre;
  let SQL = 'SELECT * FROM movie WHERE genre = $1';
  let val = [genre];
  client.query(SQL,val).then(result => {
    response.send(result.rows);
  }
  );

}

// connect to the database
client.connect().then(
  app.listen(PORT, ()=> console.log(`listening to port ${PORT}`))
).catch(err => console.log(err));
