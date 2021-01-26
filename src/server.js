require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const filmRouter = require("./modules/film/film.router");

const dbConnect = require("./utils/database");

const errorMiddleware = require("./middleware/errorMiddleware");


const app = express();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
// routes
app.use("/films", filmRouter);
// db
dbConnect();
// error's middleware
app.use(errorMiddleware);

module.exports = app;