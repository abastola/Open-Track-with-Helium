var express = require("express");
var decoder = require("../Helper/Decoder");
var router = express.Router();

/* GET home page. */
router.post("/", function (req, res, next) {
  var payload = req.body.payload;
  if (req.body.port !== 2) {
    res.json({ response: {} });
  } else {
    var locationInfo = decoder.Decoder(Buffer.from(payload, "base64"), 2);

    var locationToPush = {
      DeviceId: locationInfo.dev_id,
      Latitude: locationInfo.lat,
      Longitute: locationInfo.lng,
      TimeStamp: locationInfo.date_stamp + " " + locationInfo.time_stamp,
    };

    console.log(locationToPush);
    //TO DO - add this info to database
    res.json({ response: locationToPush });
  }
});

module.exports = router;
