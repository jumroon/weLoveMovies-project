if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./utils/errors/errorHandler");
const notFound = require("./utils/errors/notFound");
const reviewsRouter = require("./reviews/review.router");
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");

app.use(cors());
app.use(express());

// app.use("/reviews", reviewsRouter);
// app.use("/movies", moviesRouter);
// app.use("theaters", theatersRouter);

app.use(errorHandler);
app.use(notFound);

module.exports = app;
