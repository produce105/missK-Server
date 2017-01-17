/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */

let express = require("express");
let path = require("path");
const favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

let index = require("./lib/routes/index");

let app = express();



// remove x-powered-by header
app.disable("x-powered-by");

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// uncomment after placing your favicon in /lib
// app.use(express.static(__dirname + "./lib"));
app.use(favicon(path.join(__dirname, "./lib", "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Router
app.use("/", index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error("Not Found");
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(err.status).json({"error": err.message});
  // console.log(err);
});


export default app;
