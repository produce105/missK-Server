/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */

import RequestService from "./../services/requestService";
import CONST from "./../../const";

export default class PublicAPI {
    private AIR_POLUTION_PRECIT_URL: string;
    private AIR_POLUTION_INFO_API_URL: string;
    private AIR_POLUTION_INFO_OPTIONS: Object;
    private AIR_POLUTION_PRECIT_OPTIONS: Object;

    constructor() {
        this.AIR_POLUTION_INFO_API_URL = CONST.OPEN_API_URL + CONST.AIR_INFO;
        this.AIR_POLUTION_INFO_OPTIONS = {
            stationName: "종로구",
            dataTerm: "MONTH", // YEAR, DAILY
            pageNo: 1,
            numOfRows: 1000,
            ServiceKey: CONST.OPEN_API_KEY,
            ver: 1.3,
            _returnType: "json"
        };

        this.AIR_POLUTION_PRECIT_URL = CONST.OPEN_API_URL + CONST.AIR_PREDICATE;
        this.AIR_POLUTION_PRECIT_OPTIONS = {
            searchDate: "2017-01-15",
            ServiceKey: CONST.OPEN_API_KEY,
            _returnType: "json"
        };
    };

    getAirPolutionInfo() {
        return new Promise((resolve, reject) => {
            RequestService.requestToUrl(this.AIR_POLUTION_INFO_API_URL, this.AIR_POLUTION_INFO_OPTIONS).then((res) => {
                resolve(res.body);
            }).catch((err) => {
                reject({err: err});
            });
        });
    }

    getAirPolutionPredict() {
        return new Promise((resolve, reject) => {
            RequestService.requestToUrl(this.AIR_POLUTION_PRECIT_URL, this.AIR_POLUTION_PRECIT_OPTIONS).then((res) => {
                resolve(res.body);
            }).catch((err) => {
                reject({err: err});
            });
        });
    }
}
