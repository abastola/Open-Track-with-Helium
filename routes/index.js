var express = require("express");
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get("/", function (req, res, next) {
  var locations = [
    ["8/11/2022, 8:11:59 PM", 11.8166, 122.0942],
    ["8/11/2022, 8:13:59 PM", 11.8202, 122.0621],
    ["8/11/2022, 8:12:59 PM", 11.8804, 122.0189],
    ["8/11/2022, 8:16:59 PM", 11.8929, 122.0125]
  ];

  var responseData = {
    title: "John Doe's Location",
    locations: locations,
  };

  res.render("index", { Response: responseData });
});

module.exports = router;
