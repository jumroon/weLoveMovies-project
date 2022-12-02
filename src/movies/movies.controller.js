const service = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

async function list(request, response, next) {
  const { is_showing } = request.query; //ask to explain/work on destructuring a bit more
  let result = null;
  if (is_showing) {
    result = await service.listShowings();
  } else {
    result = await service.list();
  }

  response.status(200).json({ data: result });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
