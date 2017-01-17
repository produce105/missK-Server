/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */

/** External dependencies **/
import express = require("express");
let request = require("request");
let router = express.Router();
const bunyan = require("bunyan");


/** Internal dependencies **/
import dust from "./../controllers/dust";
import publicAPI from "./../controllers/publicAPI";
import CONST from "./../../const";

// construct
let Dust = new dust();
let PublicAPI = new publicAPI();

/*
  Set Log variable
 */
const log = bunyan.createLogger({
  name: "miss_k_log",
  streams: [
    {
      level: "info",
      // stream: process.stdout,
      path: CONST.INFO_LOG_PATH
    },
    {
      level: "warn",
      path: CONST.WARN_LOG_PATH
    }
  ]
});

/*
 Create Dust
 */
router.post("/dust", (req, res, next) => {
  Dust.createDust().then(() => {
    res.status(200).json({"res": "Dust Create success"});
    log.info("Dust Create success" + new Date().getUTCDate());
  }).catch(() => {
    res.status(500).json({"res": "Dust Create fail"});
    log.warn("Dust Create fail" + new Date().getUTCDate());
  });
});

/*
 Get One Dust
 */
router.get("/dust/:id", (req, res, next) => {
  let dustId = req.params.id;

  Dust.readDustOne(dustId).then((result) => {
    res.status(200).json({"res": result});
    log.info("Get One Dust success" + new Date().getUTCDate());
  }).catch((err) => {
    log.warn("Get One Dust fail" + new Date().getUTCDate());
  });
});

/*
  Get All Dust
 */
router.get("/dust", (req, res) => {
  Dust.readDustAll().then((result) => {
    res.status(200).json({res: "Dust get success", data: result});
    log.info("Get All Dust success" + new Date().getUTCDate());
  }).catch((error) => {
    res.status(500).json({res: "Dust get fail", errorMsg: error});
    log.warn("Get All Dust fail" + new Date().getUTCDate());
  });
});

/*
 Update Dust
 */
router.put("/dust/:id", (req, res) => {
  let dustId = req.params.id;

  Dust.updateDust(dustId).then((result) => {
    res.status(200).json({res: "Dust update success", data: result});
    log.info("Update One Dust success" + new Date().getUTCDate());
  }).catch((error) => {
    res.status(500).json({res: "Dust update fail", errorMsg: error});
    log.warn("Update One Dust fail" + new Date().getUTCDate());
  });
});

/*
  Delete Dust
 */
router.delete("/dust/:id", (req, res) => {
  let dustId = req.params.id;

  Dust.deleteDust(dustId).then((result) => {
    res.status(200).json({res: "Dust delete success", data: result});
    log.info("Delete One Dust success" + new Date().getUTCDate());
  }).catch((error) => {
    res.status(500).json({res: "Dust delete fail", errorMsg: error});
    log.warn("Delete One Dust fail" + new Date().getUTCDate());
  });
});

/*
  아래 코드는 테스트중...
 */

/*
 Request to Open API (Air Polution predict)
 */
router.get("/test1", (req, res) => {
  PublicAPI.getAirPolutionPredict().then((result) => {
    res.status(200).json({data: result});
  }).catch((err) => {
    res.status(500).json({res: "Dust delete fail", errorMsg: err});
    log.warn("test info fail" + new Date().getUTCDate());
  });
});

/*
 Request to Open API (Air Polution info)
 */
router.get("/test2", (req, res) => {
  PublicAPI.getAirPolutionInfo().then((result) => {
    res.status(200).json({data: result});
  }).catch((err) => {
    res.status(500).json({res: "predict fail", errorMsg: err});
    log.warn("predict fail" + new Date().getUTCDate());
  });
});

/*
 Test Route
 */
router.get("/test", (req, res) => {
  let options = {
    method: "GET",
    uri: "http://www.naver.com",
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    res.status(200).json({status: body});
  });
});

module.exports = router;
