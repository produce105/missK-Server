"use strict";
let express = require("express");
let path = require("path");
const favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let index = require("./lib/routes/index");
let cronJob = require('cron').CronJob;
const index_1 = require("./lib/routes/index");
let app = express();
app.disable("x-powered-by");
app.use(favicon(path.join(__dirname, "./lib", "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", index);
app.use((req, res, next) => {
    let err = new Error("Not Found");
    next(err);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.status(err.status).json({ "error": err.message });
});
new cronJob('*/10 * * * * *', function () {
    console.log('Y' + new Date());
    index_1.dustSave();
}, null, true, "Asia/Seoul");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
