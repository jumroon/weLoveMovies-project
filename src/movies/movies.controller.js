const service = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

async function list(request, response) {
  const { is_showing } = request.query; //ask to explain/work on destructuring a bit more
  let result = null;
  if (is_showing) {
    result = await service.listShowings();
  } else {
    result = await service.list();
  }

  response.status(200).json({ data: result });
}

async function checkIfMovieIdExists(request, response, next) {
  const result = await service.getMovieById(request.params.movieId);
  if (result.length === 0) {
    response.status(404).json({ error: "movie Id does not exist" });
  } else {
    next();
  }
}

function getMovieById(response, request, next) {
  console.log(request);

  response.status(204).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  getMovieById: [
    asyncErrorBoundary(checkIfMovieIdExists),
    // asyncErrorBoundary(getMovieById),
  ],
};
