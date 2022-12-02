const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listShowings() {
  const subquery = knex("movies_theaters")
    .distinct("movie_id")
    .where({ is_showing: true })
    .as("movies_shown");

  return knex("movies").join(subquery, {
    "movies_shown.movie_id": "movies.movie_id",
  });
}

function getMovieById(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId });
}

module.exports = { list, listShowings, getMovieById };
