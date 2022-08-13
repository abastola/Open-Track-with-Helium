var express = require("express");
var decoder = require("../Helper/Decoder");
var database = require("../database");
var router = express.Router();

/* GET home page. */
router.post("/", function (req, res, next) {
  try {
    var payload = req.body.payload;
    if (req.body.port !== 2) {
      res.json({ response: {} });
    } else {
      var locationInfo = decoder.Decoder(Buffer.from(payload, "base64"), 2);

      var locationToPush = {
        DeviceID: locationInfo.dev_id,
        Latitude: locationInfo.lat,
        Longitude: locationInfo.lng,
        Time: locationInfo.date_stamp + " " + locationInfo.time_stamp,
      };
      database.addDeviceData(locationToPush);
      res.json({ response: locationToPush });
    }
  }
  catch {
    res.json({ response: {} });
  }
});

module.exports = router;
