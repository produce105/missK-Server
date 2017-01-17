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
        // 왜 ServiceKey는 querystring으로 안 했냐면 API_KEY에 %가 들어가 있어서 퍼센트 인코딩문제가 일어남. 그래서 하드코딩
        this.AIR_POLUTION_INFO_API_URL = CONST.OPEN_API_URL + CONST.AIR_INFO + "?ServiceKey=" + CONST.OPEN_API_KEY;
        // Todo: 현재는 하드코딩 되어있음. 파라미터 변경 가능하게
        this.AIR_POLUTION_INFO_OPTIONS = {
            stationName: "종로구",
            dataTerm: "MONTH", // YEAR, DAILY
            pageNo: 1,
            numOfRows: 1000,
            ver: 1.3,
            _returnType: "json"
        };

        // 왜 ServiceKey는 querystring으로 안 했냐면 API_KEY에 %가 들어가 있어서 퍼센트 인코딩문제가 일어남. 그래서 하드코딩
        this.AIR_POLUTION_PRECIT_URL = CONST.OPEN_API_URL + CONST.AIR_PREDICATE + "?ServiceKey=" + CONST.OPEN_API_KEY;
        this.AIR_POLUTION_PRECIT_OPTIONS = {
            searchDate: "2017-01-15",
            _returnType: "json"
        };
    };

    getAirPolutionInfo() {
        return new Promise((resolve, reject) => {
            RequestService.requestToUrl(this.AIR_POLUTION_INFO_API_URL, this.AIR_POLUTION_INFO_OPTIONS).then((res) => {
                resolve(JSON.parse(res.body));
            }).catch((err) => {
                reject({err: err});
            });
        });
    }

    getAirPolutionPredict() {
        return new Promise((resolve, reject) => {
            RequestService.requestToUrl(this.AIR_POLUTION_PRECIT_URL, this.AIR_POLUTION_PRECIT_OPTIONS).then((res) => {
                resolve(JSON.parse(res.body));
            }).catch((err) => {
                reject({err: err});
            });
        });
    }
}
