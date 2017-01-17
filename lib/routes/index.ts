/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */

import express = require("express");
import dust from "./../controllers/dust";
import publicAPI from "./../controllers/publicAPI";

import CONST from "./../../const";
let router = express.Router();
const bunyan = require("bunyan");
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


// construct
let Dust = new dust();
let PublicAPI = new publicAPI();

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
router.get("/test/1", (req, res) => {
  let options = {
    "method": "GET",
    "hostname": "openapi.airkorea.or.kr",
    "port": null,
    "path": "/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%A2%85%EB%A1%9C%EA%B5%AC&dataTerm=MONTH&pageNo=1&numOfRows=1000&ServiceKey=YhOH4oxqMgvxjmqtZ%252Fca99aak9j6ZNvPgN6jF7urvEAQgiS45uxA1BNpevxQLYQf8Aar%252Br%252FVt2pvwmtQwV7UuQ%253D%253D&ver=1.3&_returnType=json",
    "headers": {
      "cache-control": "no-cache",
      "postman-token": "0a4e6762-74b2-589d-ee90-b04358391cc4"
    }
  };

  let request = http.request(options, function (response) {
    let chunks = [];

    response.on("data", function (chunk) {
      chunks.push(chunk);
    });

    response.on("end", function () {
      let body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  request.end();
});

router.get("/proxy", (req, res) => {
  console.log(req);
});

module.exports = router;
