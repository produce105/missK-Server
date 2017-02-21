"use strict";
const express = require("express");
let request = require("request");
let router = express.Router();
let querystring = require("querystring");
const bunyan = require("bunyan");
const dust_1 = require("./../controllers/dust");
const publicAPI_1 = require("./../controllers/publicAPI");
const const_1 = require("./../../const");
let Dust = new dust_1.default();
let PublicAPI = new publicAPI_1.default();
const log = bunyan.createLogger({
    name: "miss_k_log",
    streams: [
        {
            level: "info",
            path: const_1.default.INFO_LOG_PATH
        },
        {
            level: "warn",
            path: const_1.default.WARN_LOG_PATH
        }
    ]
});
router.get("/", (req, res, next) => {
    res.status(200).json({ status: "server On" });
});
router.post("/dust", (req, res, next) => {
    Dust.createDust().then(() => {
        res.status(200).json({ "res": "Dust Create success" });
        log.info("Dust Create success" + new Date().getUTCDate());
    }).catch(() => {
        res.status(500).json({ "res": "Dust Create fail" });
        log.warn("Dust Create fail" + new Date().getUTCDate());
    });
});
router.get("/dust/:id", (req, res, next) => {
    let dustId = req.params.id;
    Dust.readDustOne(dustId).then((result) => {
        res.status(200).json({ "res": result });
        log.info("Get One Dust success" + new Date().getUTCDate());
    }).catch((err) => {
        log.warn("Get One Dust fail" + new Date().getUTCDate());
    });
});
router.get("/dust", (req, res) => {
    Dust.readDustAll().then((result) => {
        res.status(200).json({ res: "Dust get success", data: result });
        log.info("Get All Dust success" + new Date().getUTCDate());
    }).catch((error) => {
        res.status(500).json({ res: "Dust get fail", errorMsg: error });
        log.warn("Get All Dust fail" + new Date().getUTCDate());
    });
});
router.put("/dust/:id", (req, res) => {
    let dustId = req.params.id;
    Dust.updateDust(dustId).then((result) => {
        res.status(200).json({ res: "Dust update success", data: result });
        log.info("Update One Dust success" + new Date().getUTCDate());
    }).catch((error) => {
        res.status(500).json({ res: "Dust update fail", errorMsg: error });
        log.warn("Update One Dust fail" + new Date().getUTCDate());
    });
});
router.delete("/dust/:id", (req, res) => {
    let dustId = req.params.id;
    Dust.deleteDust(dustId).then((result) => {
        res.status(200).json({ res: "Dust delete success", data: result });
        log.info("Delete One Dust success" + new Date().getUTCDate());
    }).catch((error) => {
        res.status(500).json({ res: "Dust delete fail", errorMsg: error });
        log.warn("Delete One Dust fail" + new Date().getUTCDate());
    });
});
router.get("/getdust", (req, res) => {
    let date = req.query.date || Dateformatter(new Date);
    let time = req.query.hour || new Date().getHours();
    PublicAPI.readDustInfo(date, time).then((result) => {
        res.status(200).json({ res: "Dust get success", data: result });
    }).catch((err) => {
        res.status(500).json({ res: "Dust get fail", errorMsg: err });
        log.warn("test info fail" + new Date().getUTCDate());
    });
});
router.get("/getpredict", (req, res) => {
    let date = req.query.date || Dateformatter(new Date);
    let time = req.query.hour || new Date().getHours();
    PublicAPI.readPredictInfo(date, time).then((result) => {
        res.status(200).json({ res: "Dust get success", data: result });
    }).catch((err) => {
        res.status(500).json({ res: "Dust get fail", errorMsg: err });
        log.warn("test info fail" + new Date().getUTCDate());
    });
});
router.get("/dustpredicate", (req, res) => {
    let searchDate = req.query.searchDate || Dateformatter(new Date);
    PublicAPI.getAirPolutionPredict(searchDate).then((result) => {
        res.status(200).json({ data: result });
    }).catch((err) => {
        res.status(500).json({ res: "Dust dustpredicate fail", errorMsg: err });
        log.warn("test info fail" + new Date().getUTCDate());
    });
});
router.get("/dustinfo", (req, res) => {
    let location;
    (req.query.hasOwnProperty("location")) ? location = req.query.location : location = "중구";
    let term = req.query.term || "DAILY";
    let pageNo = req.query.pageNo || 1;
    let numOfRows = req.query.numOfRows || 1000;
    PublicAPI.getAirPolutionInfo(location, term, pageNo, numOfRows).then((result) => {
        res.status(200).json({ data: result });
    }).catch((err) => {
        res.status(500).json({ res: "dust info fail", errorMsg: err });
        log.warn("dust info fail" + new Date().getUTCDate());
    });
});
function Dateformatter(today) {
    let month = '' + (today.getMonth() + 1);
    let date = '' + today.getDate();
    if (month.length < 2)
        month = '0' + month;
    if (date.length < 2)
        date = '0' + date;
    return today.getFullYear() + '-' + month + '-' + date;
}
module.exports = router;
