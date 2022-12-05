const knex = require("../db/connection");

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

// async function update(updatedReview, reviewId) {
//   await knex("reviews")
//     .where({ review_id: reviewId })
//     .update({ ...updatedReview, updated_at: knex.fn.now() });

// }

module.exports = { update };
