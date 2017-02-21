/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */

/**
 * 미세먼지 공공데이터 API 기술문서
 * https://www.data.go.kr/commonUser/fileDownload.do?atchFileId=FILE_000000001331629&fileDetailSn=0
 * 다운받아서 파라미터 등등 참조.
 */

/** External dependencies **/
import express = require("express");
let request = require("request");
let router = express.Router();
let querystring = require("querystring");
const bunyan = require("bunyan");


/** Internal dependencies **/
import dust from "./../controllers/dust";
import publicAPI from "./../controllers/publicAPI";
import CONST from "./../../const";
import {escape} from "querystring";

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
router.get("/", (req, res, next) => {
  res.status(200).json({status: "server On"});
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
 Request to MongoDB predict infomation
 1. TODO:
 */
router.get("/totalinfo", (req, res) => {
  let lat = req.query.lat || 37.564939;
  let long = req.query.long || 126.975914;
  let date = req.query.date || Dateformatter(new Date);
  let time = req.query.hour || new Date().getHours();

  PublicAPI.getTotalInfo(lat,long,date,time).then((result) => {
    res.status(200).json({res: "Total info get success", data: result});
  }).catch((err) => {
    res.status(500).json({res: "Total info get fail", errorMsg: err});
    log.warn("test info fail" + new Date().getUTCDate());
  });

});


/*
 Request to MongoDB
 1. TODO: 오늘의 pm10 pm25 predication 반환하는거
 */
router.get("/getdust", (req, res) => {
  let date = req.query.date || Dateformatter(new Date);
  let time = req.query.hour || new Date().getHours();

  PublicAPI.readDustInfo(date,time).then((result) => {
    res.status(200).json({res: "Dust get success", data: result});
  }).catch((err) => {
    res.status(500).json({res: "Dust get fail", errorMsg: err});
    log.warn("test info fail" + new Date().getUTCDate());
  });

});

/*
 Request to MongoDB predict date
 1. TODO: 오늘,내일,모레 predication 반환하는거
 */
router.get("/getpredict", (req, res) => {
  let date = req.query.date || Dateformatter(new Date);
  let time = req.query.hour || new Date().getHours();

  PublicAPI.readPredictInfo(date,time).then((result) => {
    res.status(200).json({res: "Dust get success", data: result});
  }).catch((err) => {
    res.status(500).json({res: "Dust get fail", errorMsg: err});
    log.warn("test info fail" + new Date().getUTCDate());
  });

});

/*
 Request to Open API (Air Polution predict)
 1. TODO: cron - 05시, 11시, 17시, 23시 마다
 */
router.get("/dustpredicate", (req, res) => {
  let searchDate = req.query.searchDate || Dateformatter(new Date);
  PublicAPI.getAirPolutionPredict(searchDate).then((result) => {
    res.status(200).json({data: result});
  }).catch((err) => {
    res.status(500).json({res: "Dust dustpredicate fail", errorMsg: err});
    log.warn("test info fail" + new Date().getUTCDate());
  });
});

/*
Request to Open API (Air Polution info)
1. TODO: cron 돌릴때 17개 측정소당 돌릴것
2. TODO: HOURLY가 아니라서 중복데이터가 너무 많아짐 - 측정소당 시간정보만 가져올방법 찾아보기
 */
router.get("/dustinfo", (req, res) => {
  let location;
  (req.query.hasOwnProperty("location")) ? location = req.query.location : location = "중구";

  PublicAPI.getAirPolutionInfo(location).then((result) => {
    res.status(200).json({data: result});
  }).catch((err) => {
    res.status(500).json({res: "dust info fail", errorMsg: err});
    log.warn("dust info fail" + new Date().getUTCDate());
  });
});

function Dateformatter(today)
{
  let month = ''+(today.getMonth()+1);
  let date = ''+today.getDate();
  if(month.length< 2)
      month ='0'+month;
  if(date.length< 2)
      date ='0'+date;

  return today.getFullYear()+'-'+month+'-'+date;
}

module.exports = router;
