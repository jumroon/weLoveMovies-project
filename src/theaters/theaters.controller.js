const service = require("./theaters.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

async function list(request, response, next) {
  const result = await service.list();
  console.log("result", result);
  response.status(200).json({ data: result });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
