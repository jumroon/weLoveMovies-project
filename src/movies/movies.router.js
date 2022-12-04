const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");
const notFound = require("../utils/errors/notFound");

router
  .route("/:movieId/reviews")
  .get(controller.getReviews)
  .all(methodNotAllowed);

router
  .route("/:movieId/theaters")
  .get(controller.getTheaters)
  .all(methodNotAllowed);

router.route("/:movieId").get(controller.getMovieById).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

router.route("*").all(notFound);

module.exports = {
  router,
};
