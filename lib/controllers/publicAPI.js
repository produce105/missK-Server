"use strict";
const requestService_1 = require("./../services/requestService");
const const_1 = require("./../../const");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;
let dustInfoSchema = new Schema({
    dataTime: String,
    mangName: String,
    so2Grade: Number,
    so2Value: Number,
    no2Grade: Number,
    no2Value: Number,
    o3Grade: Number,
    o3Value: Number,
    coGrade: Number,
    coValue: Number,
    pm10Value: Number,
    pm10Value24: Number,
    pm10Grade: Number,
    pm10Grade1h: Number,
    pm25Value: Number,
    pm25Value24: Number,
    pm25Grade: Number,
    pm25Grade1h: Number
});
let dustPredictSchema = new Schema({
    dataTime: String,
    f_inform_data: String,
    informCause: String,
    informGrade: String,
    informCode: String
});
const DustInfoModel = mongoose.model("realdust", dustInfoSchema);
const DustPredictModel = mongoose.model("predictdust", dustPredictSchema);
class PublicAPI {
    constructor() {
        this.AIR_POLUTION_INFO_API_URL = const_1.default.OPEN_API_URL + const_1.default.AIR_INFO + "?ServiceKey=" + const_1.default.OPEN_API_KEY;
        this.AIR_POLUTION_INFO_OPTIONS = {
            stationName: "종로구",
            dataTerm: "MONTH",
            pageNo: 1,
            numOfRows: 1000,
            ver: 1.3,
            _returnType: "json"
        };
        this.AIR_POLUTION_PRECIT_URL = const_1.default.OPEN_API_URL + const_1.default.AIR_PREDICATE + "?ServiceKey=" + const_1.default.OPEN_API_KEY;
        this.AIR_POLUTION_PRECIT_OPTIONS = {
            searchDate: "2017-01-15",
            _returnType: "json"
        };
    }
    ;
    getAirPolutionInfo(location, term, pageNo, numOfRows) {
        return new Promise((resolve, reject) => {
            console.log('NEW ' + location + ' ' + term + ' ' + pageNo + ' ' + numOfRows);
            this.AIR_POLUTION_INFO_OPTIONS["stationName"] = location;
            this.AIR_POLUTION_INFO_OPTIONS["dataTerm"] = term;
            this.AIR_POLUTION_INFO_OPTIONS["pageNo"] = pageNo;
            this.AIR_POLUTION_INFO_OPTIONS["numOfRows"] = numOfRows;
            requestService_1.default.requestToUrl(this.AIR_POLUTION_INFO_API_URL, this.AIR_POLUTION_INFO_OPTIONS).then((res) => {
                let parsedBody = JSON.parse(res["body"]);
                for (let listNum = 0; listNum < parsedBody["list"].length; listNum++) {
                    let parsedBodyIdx = parsedBody["list"][listNum];
                    let dustInfo = new DustInfoModel();
                    Object.keys(parsedBodyIdx).forEach((key) => {
                        dustInfo[key] = parsedBodyIdx[key];
                    });
                    dustInfo.save();
                    console.log(dustInfo);
                }
                resolve("Saved");
            }).catch((err) => {
                reject({ err: err });
            });
        });
    }
    getAirPolutionPredict(searchDate) {
        return new Promise((resolve, reject) => {
            this.AIR_POLUTION_PRECIT_OPTIONS["searchDate"] = searchDate;
            requestService_1.default.requestToUrl(this.AIR_POLUTION_PRECIT_URL, this.AIR_POLUTION_PRECIT_OPTIONS).then((res) => {
                let parsedBody = JSON.parse(res["body"]);
                console.log(searchDate);
                for (let listNum = 0; listNum < parsedBody["list"].length; listNum++) {
                    let parsedBodyIdx = parsedBody["list"][listNum];
                    let newpredict = new DustPredictModel();
                    Object.keys(parsedBodyIdx).forEach((key) => {
                        newpredict[key] = parsedBodyIdx[key];
                    });
                    newpredict.save();
                }
                resolve('Saved');
            }).catch((err) => {
                reject({ err: err });
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublicAPI;
