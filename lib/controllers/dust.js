/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */
"use strict";
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
mongoose.Promise = global.Promise;
var DustModel = mongoose.model("Dust", { name: String });
var Dust = (function () {
    // name: String;
    function Dust() {
        // this.name = "test";
    }
    Dust.prototype.createDust = function () {
        var dust = new DustModel({ name: "dust1" });
        return dust.save();
    };
    Dust.prototype.readDustOne = function (id) {
        return DustModel.find({ _id: id });
    };
    Dust.prototype.readDustAll = function () {
        return DustModel.find();
    };
    Dust.prototype.updateDust = function (id) {
        return DustModel.update({ _id: id }, { name: "dust2" });
    };
    Dust.prototype.deleteDust = function (id) {
        return DustModel.remove({ _id: id });
    };
    return Dust;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dust;
