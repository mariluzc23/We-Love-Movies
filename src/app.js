if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")

// error imports
const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")

// router imports
const moviesRouter = require("./movies/movies.router")
const reviewsRouter = require("./reviews/reviews.router")
const theatersRouter = require("./theaters/theaters.router")

app.use(cors())
app.use(express.json())

// routes
app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)
app.use("/", moviesRouter)

// errors
app.use(notFound)
app.use(errorHandler)

module.exports = app;