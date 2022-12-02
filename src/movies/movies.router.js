const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");

router.route("/:movieId").get(controller.getMovieById).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = {
  router,
};
