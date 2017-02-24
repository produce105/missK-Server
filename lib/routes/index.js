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
let cronJob = require('cron').CronJob;
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
router.get("/totalinfo", (req, res) => {
    let lat = req.query.lat || 37.565600;
    let long = req.query.long || 126.975540;
    let date = req.query.date || Dateformatter(new Date);
    let time = req.query.hour || new Date().getHours();
    PublicAPI.getTotalInfo(lat, long, date, time).then((result) => {
        res.status(200).json({ res: "Total info get success", data: result });
    }).catch((err) => {
        res.status(500).json({ res: "Total info get fail", errorMsg: err });
        log.warn("test info fail" + new Date().getUTCDate());
    });
});
router.get("/dustpredicate", (req, res) => {
    let searchDate = req.query.searchDate || Dateformatter(new Date);
    predictSave();
});
function predictSave() {
    let searchDate = Dateformatter(new Date);
    PublicAPI.getAirPolutionPredict(searchDate).then((result) => {
    }).catch((err) => {
        log.warn("test info fail" + new Date().getUTCDate());
    });
}
exports.predictSave = predictSave;
router.get("/dustinfo", (req, res) => {
    let location;
    (req.query.hasOwnProperty("location")) ? location = req.query.location : location = "장천동";
    dustSave();
});
function dustSave() {
    let dongList = new Array('중구', '연동', '장천동', '삼천동', '농성동', '용지동', '장량동', '야음동', '이현동', '연산동', '정곡리', '칠금동', '신흥동', '구성동', '옥천동', '단대동', '석남');
    for (let i = 0; i < dongList.length; i++) {
        PublicAPI.getAirPolutionInfo(dongList[i]).then((result) => {
        }).catch((err) => {
            console.log("Error");
            log.warn("dust info fail" + new Date().getUTCDate());
        });
    }
}
exports.dustSave = dustSave;
let dustinfo = new cronJob({
    cronTime: '10 30 * * * *',
    onTick: function () {
        console.log('D' + new Date());
        dustSave();
    },
    start: false,
    timeZone: 'Asia/Seoul'
});
dustinfo.start();
let dustpredict = new cronJob({
    cronTime: '10 10 5-23/6 * * *',
    onTick: function () {
        console.log('P ' + new Date());
        predictSave();
    },
    start: false,
    timeZone: 'Asia/Seoul'
});
dustpredict.start();
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
