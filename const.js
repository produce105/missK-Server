"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */
exports.default = {
    // 실제로 이렇게 키 자체를 때려 넣는건 좋지 않음 process.env["OPEN_API_KEY"] 처럼 os에 설정된 환경변수를 이용하도록 해야함.
    OPEN_API_URL: "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/",
    OPEN_API_KEY: process.env["OPEN_API_KEY"] || "YhOH4oxqMgvxjmqtZ%2Fca99aak9j6ZNvPgN6jF7urvEAQgiS45uxA1BNpevxQLYQf8Aar%2Br%2FVt2pvwmtQwV7UuQ%3D%3D",
    AIR_INFO: "getMsrstnAcctoRltmMesureDnsty",
    AIR_PREDICATE: "getMinuDustFrcstDspth",
    INFO_LOG_PATH: __dirname + "/logs/myapp-info.log",
    WARN_LOG_PATH: __dirname + "/logs/myapp-warn.log",
    DAUM_API_URL: "https://apis.daum.net/local/geo/coord2addr",
    DAUM_API_KEY: "ebe0a39c64626e4432d75ce31cd5b90f",
};
