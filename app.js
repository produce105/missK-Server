/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */
"use strict";
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var index = require("./lib/routes/index");
var app = express();
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
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.status(err.status).json({ "error": err.message });
    // console.log(err);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
