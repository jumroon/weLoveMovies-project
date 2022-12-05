const knex = require("../db/connection");

function findReviewId(reviewId) {
  return knex("reviews").select("*").where({ review_Id: reviewId });
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

function deleteReview(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

// knex
//   .del((table) => {
//     table.from("users").where("id", "=", 1);
//   })
//   .then(() => {
//     console.log("Row deleted successfully!");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = { update, findReviewId, deleteReview };
