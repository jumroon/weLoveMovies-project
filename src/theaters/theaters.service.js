const knex = require("../db/connection");

// function list() {
//   const subquery = knex("movies_theaters")
//     .select("theater_id", "movie_id")
//     .groupBy("theater_id")
//     .as("movies_shown");

//   knex("theaters").join(subquery, {
//     "movies_shown.theater_id": "theaters.theater_id",
//   });

//   return knex("theaters").select("*");
// }

// function listShowings() {
//   const subquery = knex("movies_theaters")
//     .distinct("movie_id")
//     .where({ is_showing: true })
//     .as("movies_shown");

//   return knex("movies").join(subquery, {
//     "movies_shown.movie_id": "movies.movie_id",
//   });
// }

function list() {
  return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("m.*", "t.*", "mt.*");
}

module.exports = { list };
