/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */
"use strict";
/**
 * 미세먼지 공공데이터 API 기술문서
 * https://www.data.go.kr/commonUser/fileDownload.do?atchFileId=FILE_000000001331629&fileDetailSn=0
 * 다운받아서 파라미터 등등 참조.
 */
/** External dependencies **/
var express = require("express");
var request = require("request");
var router = express.Router();
var querystring = require("querystring");
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
router.get("/", function (req, res, next) {
    res.status(200).json({ status: "server On" });
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
 Request to Open API (Air Polution predict)
 1. TODO: 날짜별로 조회하기. querystring으로 ? 뒤에 날짜가 오는 것 별로 조회. 또는 시간별 조회
 2. TODO: Server mongoDB에 저장
 */
router.get("/dustpredicate", function (req, res) {
    PublicAPI.getAirPolutionPredict().then(function (result) {
        res.status(200).json({ data: result });
    }).catch(function (err) {
        res.status(500).json({ res: "Dust delete fail", errorMsg: err });
        log.warn("test info fail" + new Date().getUTCDate());
    });
});
/*
 Request to Open API (Air Polution info)
 1. TODO: 관측소별 조회, dataTerm별 조회, pageNo별 조회, numOfRows별 조회
 2. TODO: Server mongoDB에 저장
 3. TODO: Google search keyword: get request parameter express
 */
router.get("/dustinfo", function (req, res) {
    var position = req.position;
    PublicAPI.getAirPolutionInfo(positon).then(function (result) {
        res.status(200).json({ data: result });
    }).catch(function (err) {
        res.status(500).json({ res: "predict fail", errorMsg: err });
        log.warn("predict fail" + new Date().getUTCDate());
    });
});
module.exports = router;
