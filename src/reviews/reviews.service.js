const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

async function update(reviewId, updatedReview) {
  await knex("reviews")
    .where({ review_id: reviewId })
    .update(updatedReview)
    .select("*");

  return knex("reviews")
    .join("critics", { "critics.critic_id": "reviews.critic_id" })
    .where({ review_id: reviewId })
    .first();
}

module.exports = { update, list };
