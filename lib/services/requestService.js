/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */
"use strict";
var request = require("request");
var querystring = require("querystring");
var RequestService = (function () {
    function RequestService() {
        console.log("Request Service constructor");
    }
    RequestService.requestToUrl = function (url, qs) {
        return new Promise(function (resolve, reject) {
            request({ url: url, qs: qs }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve({ response: response, body: body });
                }
                else {
                    reject({ error: error });
                }
            });
        });
    };
    return RequestService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequestService;
