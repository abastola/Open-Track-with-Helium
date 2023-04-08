var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var dataRouter = require("./routes/adddata");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/addlocation", dataRouter);

// check database connection
require("./database").Build();

/**
 * Catch all invalid url and render them as bad request error and forward to error handler.
 */
app.use(function (req, res, next) {
  next(new createError.BadRequest("Something went wrong. Please check your URL."));
});

/**
 * Error handler function.
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  
  // render the error page and set the response status
  res.status(err.status || 500);
  res.render("error", { err });
});

module.exports = app;
