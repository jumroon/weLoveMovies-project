const service = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

async function list(request, response, next) {
  const result = await service.list();
  response.status(200).json({ data: { result: result } });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
