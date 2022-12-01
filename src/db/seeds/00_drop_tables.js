module.exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("reviews")
    .del()
    .then(() => knex("movie_theaters").del())
    .then(() => knex("critics").del())
    .then(() => knex("movies").del())
    .then(() => knex("theaters").del());
};
