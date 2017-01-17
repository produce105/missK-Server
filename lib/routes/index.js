/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */
"use strict";
/** External dependencies **/
var express = require("express");
var request = require("request");
var router = express.Router();
var bunyan = require("bunyan");
/** Internal dependencies **/
var dust_1 = require("./../controllers/dust");
var publicAPI_1 = require("./../controllers/publicAPI");
var const_1 = require("./../../const");
// construct
var Dust = new dust_1.default();
var PublicAPI = new publicAPI_1.default();
/*
  Set Log variable
 */
var log = bunyan.createLogger({
    name: "miss_k_log",
    streams: [
        {
            level: "info",
            // stream: process.stdout,
            path: const_1.default.INFO_LOG_PATH
        },
        {
            level: "warn",
            path: const_1.default.WARN_LOG_PATH
        }
    ]
});
/*
 Create Dust
 */
router.post("/dust", function (req, res, next) {
    Dust.createDust().then(function () {
        res.status(200).json({ "res": "Dust Create success" });
        log.info("Dust Create success" + new Date().getUTCDate());
    }).catch(function () {
        res.status(500).json({ "res": "Dust Create fail" });
        log.warn("Dust Create fail" + new Date().getUTCDate());
    });
});
/*
 Get One Dust
 */
router.get("/dust/:id", function (req, res, next) {
    var dustId = req.params.id;
    Dust.readDustOne(dustId).then(function (result) {
        res.status(200).json({ "res": result });
        log.info("Get One Dust success" + new Date().getUTCDate());
    }).catch(function (err) {
        log.warn("Get One Dust fail" + new Date().getUTCDate());
    });
});
/*
  Get All Dust
 */
router.get("/dust", function (req, res) {
    Dust.readDustAll().then(function (result) {
        res.status(200).json({ res: "Dust get success", data: result });
        log.info("Get All Dust success" + new Date().getUTCDate());
    }).catch(function (error) {
        res.status(500).json({ res: "Dust get fail", errorMsg: error });
        log.warn("Get All Dust fail" + new Date().getUTCDate());
    });
});
/*
 Update Dust
 */
router.put("/dust/:id", function (req, res) {
    var dustId = req.params.id;
    Dust.updateDust(dustId).then(function (result) {
        res.status(200).json({ res: "Dust update success", data: result });
        log.info("Update One Dust success" + new Date().getUTCDate());
    }).catch(function (error) {
        res.status(500).json({ res: "Dust update fail", errorMsg: error });
        log.warn("Update One Dust fail" + new Date().getUTCDate());
    });
});
/*
  Delete Dust
 */
router.delete("/dust/:id", function (req, res) {
    var dustId = req.params.id;
    Dust.deleteDust(dustId).then(function (result) {
        res.status(200).json({ res: "Dust delete success", data: result });
        log.info("Delete One Dust success" + new Date().getUTCDate());
    }).catch(function (error) {
        res.status(500).json({ res: "Dust delete fail", errorMsg: error });
        log.warn("Delete One Dust fail" + new Date().getUTCDate());
    });
});
/*
  아래 코드는 테스트중...
 */
/*
 Request to Open API (Air Polution predict)
 */
router.get("/test1", function (req, res) {
    PublicAPI.getAirPolutionPredict().then(function (result) {
        res.status(200).json({ data: result });
    }).catch(function (err) {
        res.status(500).json({ res: "Dust delete fail", errorMsg: err });
        log.warn("test info fail" + new Date().getUTCDate());
    });
});
/*
 Request to Open API (Air Polution info)
 */
router.get("/test2", function (req, res) {
    PublicAPI.getAirPolutionInfo().then(function (result) {
        res.status(200).json({ data: result });
    }).catch(function (err) {
        res.status(500).json({ res: "predict fail", errorMsg: err });
        log.warn("predict fail" + new Date().getUTCDate());
    });
});
/*
 Test Route
 */
router.get("/test", function (req, res) {
    var options = {
        method: "GET",
        uri: "http://www.naver.com",
    };
    request(options, function (error, response, body) {
        if (error)
            throw new Error(error);
        console.log(body);
        res.status(200).json({ status: body });
    });
});
module.exports = router;
