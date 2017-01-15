/**
 * Copyright (c) 2016 Produce105 - miss_k
 *
 * Main component - registers all the screens
 *
 * @author hogyun
 */

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
mongoose.Promise = global.Promise;

const DustModel = mongoose.model("Dust", {name: String});


export default class Dust {
    // name: String;
    constructor() {
        // this.name = "test";
    }

    createDust() {
        let dust = new DustModel({name: "dust1"});
        return dust.save();
    }

    readDustOne(id) {
        return DustModel.find({_id: id});
    }

    readDustAll() {
        return DustModel.find();
    }

    updateDust(id) {
        return DustModel.update({_id: id}, {name: "dust2"});
    }

    deleteDust(id) {
        return DustModel.remove({_id: id});
    }


}

