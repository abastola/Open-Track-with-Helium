var express = require("express");
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get("/", function (req, res, next) {
  var locations = [
    ["8/11/2022, 8:11:59 PM", 11.8166, 122.0942],
    ["8/11/2022, 8:12:59 PM", 11.8804, 122.0189],
    ["8/11/2022, 8:13:59 PM", 11.8202, 122.0621],
    ["8/11/2022, 8:14:59 PM", 11.8889, 122.0277],
    ["8/11/2022, 8:15:59 PM", 11.8929, 122.0325],
    ["8/11/2022, 8:16:59 PM", 11.8929, 122.0125],
    ["8/11/2022, 8:17:59 PM", 11.8929, 122.0525],
    ["8/11/2022, 8:18:59 PM", 11.8929, 122.0425],
    ["8/11/2022, 8:19:59 PM", 11.8929, 122.0329],
    ["8/11/2022, 8:20:59 PM", 11.8929, 122.03],
    ["8/11/2022, 8:21:59 PM", 11.8929, 122.01],
    ["8/11/2022, 8:22:59 PM", 11.8929, 122.0105],
    ["8/11/2022, 8:23:59 PM", 11.8929, 122.012],
  ];

  var responseData = {
    title: "John Doe's Location",
    locations: locations,
  };

  res.render("index", { Response: responseData });
});

module.exports = router;
