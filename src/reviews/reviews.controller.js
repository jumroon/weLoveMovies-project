const service = require("./reviews.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

function checkIfReviewExists(request, response, next) {
  const { reviewId } = request.params;
  if (reviewId) {
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

async function update(request, response, next) {
  const updatedReview = await service.update(
    request.params.reviewId,
    request.body.data
  );

  const reviewArray = [updatedReview];

  const reformattedReview = reviewArray.map((review) => {
    return {
      review_id: review.review_id,
      content: review.content,
      score: review.score,
      created_at: review.created_at,
      updated_at: review.updated_at,
      critic_id: review.critic_id,
      movie_id: review.movie_id,
      critic: {
        critic_id: review.critic_id,
        preferred_name: review.preferred_name,
        surname: review.surname,
        organization_name: review.organization_name,
        created_at: review.created_at,
        updated_at: review.updated_at,
      },
    };
  });

  response.status(200).json({ data: reformattedReview[0] });
}

module.exports = {
  update: [asyncErrorBoundary(checkIfReviewExists), asyncErrorBoundary(update)],
};
