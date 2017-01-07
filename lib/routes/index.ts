import express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  // res.render("index", { title: "Express" });
  // res.json({"success": true});
  res.status(200).json({"res": "hello world"});
});

module.exports = router;
