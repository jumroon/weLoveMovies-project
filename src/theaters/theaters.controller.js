const service = require("./theaters.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

async function list(request, response, next) {
  const result = await service.list();

  const testResult = result.map((movie) => {
    return {
      name: movie.name,
      address_line_1: movie.address_line_1,
      address_line_2: movie.address_line_2,
      city: movie.city,
      state: movie.state,
      zip: movie.zip,
      movies: [
        {
          title: movie.title,
          runtime_in_minutes: movie.runtime_in_minutes,
          rating: movie.rating,
        },
      ],
    };
  }, {});

  const newArray = [];

  for (let i = 0; i < testResult.length; i++) {
    if (newArray.find((theater) => theater.name === testResult[i].name)) {
      console.log("here");
      //find in the new array the object with the same name, and add the movie of testResult[i] to the movies array of this object
      newArray
        .find((obj) => obj.name === testResult[i].name)
        .movies.push(testResult[i].movies[0]);
    } else {
      newArray.push(testResult[i]);
    }
  }

  response.status(200).json({ data: newArray });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
