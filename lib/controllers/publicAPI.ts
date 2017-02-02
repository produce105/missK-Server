/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */

import RequestService from "./../services/requestService";
import CONST from "./../../const";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;
let dustInfoSchema = new Schema({
  dataTime: Date,
  no2Grade: Number,
  no2Value: String

});

let dustPredictSchema = new Schema({
  dataTime: String,
  f_inform_data: String,
  informGrade: String,
  informCode: String
});



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
            searchDate: "2017-01-15", // Todo: searchDate를 params로 부터 받아온 값으로 바꾸기
            _returnType: "json"
        };
    };

    getAirPolutionInfo(position) {
        return new Promise((resolve, reject) => {
            // Todo parameter 넘어온거 이 부분에서 받을 수 있게만.
            // let positon = position;
            RequestService.requestToUrl(this.AIR_POLUTION_INFO_API_URL, this.AIR_POLUTION_INFO_OPTIONS).then((res) => {
                resolve(JSON.parse(res["body"]));
            }).catch((err) => {
                reject({err: err});
            });
        });
    }

    getAirPolutionPredict(searchDate) {
        return new Promise((resolve, reject) => {
            this.AIR_POLUTION_PRECIT_OPTIONS["searchDate"] = searchDate;
            RequestService.requestToUrl(this.AIR_POLUTION_PRECIT_URL, this.AIR_POLUTION_PRECIT_OPTIONS).then((res) => {
                // Todo: 지금껀 가장 최근 (배열에서 첫번째 요소)만 response로 줌. 잘 파싱해서 array로 줘도 되고 수민이 마음대로 :)
                let parsedBody = JSON.parse(res["body"]);
                console.log(parsedBody["list"][0]);
                resolve(parsedBody["list"][0]);
            }).catch((err) => {
                reject({err: err});
            });
        });
    }
}
