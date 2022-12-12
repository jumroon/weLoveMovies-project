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

async function getMovieById(request, response) {
  const result = await service.getMovieById(request.params.movieId);
  response.status(200).json({ data: result[0] });
}

async function getTheaters(request, response) {
  const result = await service.getTheaters(request.params.movieId);
  response.status(200).json({ data: result });
}

async function getReviews(request, response) {
  const resultArray = await service.getReviews(request.params.movieId);
  let result = resultArray.map((item) => {
    return {
      movie_id: item.movie_id,
      critic: {
        preferred_name: item.preferred_name,
        surname: item.surname,
        organization_name: item.organization_name,
      },
    };
  });

  response.status(200).json({ data: result });
}
module.exports = {
  list: asyncErrorBoundary(list),
  getMovieById: [
    asyncErrorBoundary(checkIfMovieIdExists),
    asyncErrorBoundary(getMovieById),
  ],
  getTheaters: [
    asyncErrorBoundary(checkIfMovieIdExists),
    asyncErrorBoundary(getTheaters),
  ],
  getReviews: [
    asyncErrorBoundary(checkIfMovieIdExists),
    asyncErrorBoundary(getReviews),
  ],
};
