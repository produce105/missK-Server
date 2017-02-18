"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    informData: String,
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
                }
                resolve(parsedBody);
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
    readDustInfo(date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let announceTime = getTime(date, time);
                if ((time + '').length < 2)
                    time = '0' + time;
                console.log(announceTime + " & " + date + ' ' + time);
                let predict = yield DustPredictModel.find({ informData: date, informCode: "PM25", dataTime: announceTime }, { informGrade: 1, _id: 0 });
                let dustinfo = yield DustInfoModel.find({ "dataTime": date + " " + time + ":00" }, { pm10Value: 1, pm25Value: 1, dataTime: 1, _id: 0 }).limit(1);
                predict = predict.concat(dustinfo);
                return predict;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    readPredictInfo(date, time) {
        let announceTime = getTime(date, time);
        let predict = DustPredictModel.find({ informCode: "PM25", dataTime: announceTime }, { informData: 1, informGrade: 1, _id: 0 });
        return predict;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublicAPI;
function getTime(date, time) {
    let announceTime = '';
    if (5 <= time && time < 11)
        announceTime = date + ' 05시 발표';
    else if (11 <= time && time < 17)
        announceTime = date + ' 11시 발표';
    else if (17 <= time && time < 23)
        announceTime = date + ' 17시 발표';
    else {
        if (time < 5 || time === 24) {
            let str = date.split('-');
            str[2] = str[2] - 1;
            announceTime = str.join('-') + ' 23시 발표';
        }
        else
            announceTime = date + ' 23시 발표';
    }
    return announceTime;
}
