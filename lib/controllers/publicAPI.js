/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */
"use strict";
var requestService_1 = require("./../services/requestService");
var const_1 = require("./../../const");
var PublicAPI = (function () {
    function PublicAPI() {
        // 왜 ServiceKey는 querystring으로 안 했냐면 API_KEY에 %가 들어가 있어서 퍼센트 인코딩문제가 일어남. 그래서 하드코딩
        this.AIR_POLUTION_INFO_API_URL = const_1.default.OPEN_API_URL + const_1.default.AIR_INFO + "?ServiceKey=" + const_1.default.OPEN_API_KEY;
        // Todo: 현재는 하드코딩 되어있음. 파라미터 변경 가능하게
        this.AIR_POLUTION_INFO_OPTIONS = {
            stationName: "종로구",
            dataTerm: "MONTH",
            pageNo: 1,
            numOfRows: 1000,
            ver: 1.3,
            _returnType: "json"
        };
        // 왜 ServiceKey는 querystring으로 안 했냐면 API_KEY에 %가 들어가 있어서 퍼센트 인코딩문제가 일어남. 그래서 하드코딩
        this.AIR_POLUTION_PRECIT_URL = const_1.default.OPEN_API_URL + const_1.default.AIR_PREDICATE + "?ServiceKey=" + const_1.default.OPEN_API_KEY;
        this.AIR_POLUTION_PRECIT_OPTIONS = {
            searchDate: "2017-01-15",
            _returnType: "json"
        };
    }
    ;
    PublicAPI.prototype.getAirPolutionInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            requestService_1.default.requestToUrl(_this.AIR_POLUTION_INFO_API_URL, _this.AIR_POLUTION_INFO_OPTIONS).then(function (res) {
                resolve(JSON.parse(res.body));
            }).catch(function (err) {
                reject({ err: err });
            });
        });
    };
    PublicAPI.prototype.getAirPolutionPredict = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            requestService_1.default.requestToUrl(_this.AIR_POLUTION_PRECIT_URL, _this.AIR_POLUTION_PRECIT_OPTIONS).then(function (res) {
                resolve(JSON.parse(res.body));
            }).catch(function (err) {
                reject({ err: err });
            });
        });
    };
    return PublicAPI;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublicAPI;
