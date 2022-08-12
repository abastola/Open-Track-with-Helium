var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/", function (req, res, next) {
  var data = {
    DeviceId: req.body.DeviceId,
    Lat: req.body.Latitude,
    Long: req.body.Longitude,
    TimeStamp: req.body.TimeStamp,
  };
  console.log(data);
  res.json({ response: data });
});

module.exports = router;
