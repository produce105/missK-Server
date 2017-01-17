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
        this.AIR_POLUTION_INFO_API_URL = const_1.default.OPEN_API_URL + const_1.default.AIR_INFO;
        this.AIR_POLUTION_INFO_OPTIONS = {
            stationName: "종로구",
            dataTerm: "MONTH",
            pageNo: 1,
            numOfRows: 1000,
            ServiceKey: const_1.default.OPEN_API_KEY,
            ver: 1.3,
            _returnType: "json"
        };
        this.AIR_POLUTION_PRECIT_URL = const_1.default.OPEN_API_URL + const_1.default.AIR_PREDICATE;
        this.AIR_POLUTION_PRECIT_OPTIONS = {
            searchDate: "2017-01-15",
            ServiceKey: const_1.default.OPEN_API_KEY,
            _returnType: "json"
        };
    }
    ;
    PublicAPI.prototype.getAirPolutionInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            requestService_1.default.requestToUrl(_this.AIR_POLUTION_INFO_API_URL, _this.AIR_POLUTION_INFO_OPTIONS).then(function (res) {
                resolve(res.body);
            }).catch(function (err) {
                reject({ err: err });
            });
        });
    };
    PublicAPI.prototype.getAirPolutionPredict = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            requestService_1.default.requestToUrl(_this.AIR_POLUTION_PRECIT_URL, _this.AIR_POLUTION_PRECIT_OPTIONS).then(function (res) {
                resolve(res.body);
            }).catch(function (err) {
                reject({ err: err });
            });
        });
    };
    return PublicAPI;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublicAPI;
