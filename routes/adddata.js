var express = require("express");
var decoder = require("../Helper/Decoder");
var database = require("../database");
var router = express.Router();

/**
 * URI: /addlocation/adddata
 * Receives payload and port in the body
 * Adds the decoded info into the database
 */
router.post("/", function (req, res, next) {
  const {dev_eui = ''} = req.body;

  if (!dev_eui){
    return res.status(400).send('No DEV EUI in request payload');
  }
  try {
    var payload = req.body.payload;
    if (req.body.port !== 2) {
      res.json({ response: {} });
    } else {

      // Decoding Base64 Strings for 'payload'
      // Decoded string is then passed through Decoder which returns a json object with the device and it's location
      var locationInfo = decoder.Decoder(Buffer.from(payload, "base64"), 2);

      if (locationInfo && "dev_id" in locationInfo && "lat" in locationInfo && "lng" in locationInfo) {
        var locationToPush = {
          DeviceID: dev_eui,
          Latitude: locationInfo.lat,
          Longitude: locationInfo.lng,
          Time: new Date(Date.now()).toISOString()
        };
        console.log("Adding this data ", locationToPush)
        database.AddDeviceData(locationToPush);
        res.sendStatus(200);
      }
      else {
        res.sendStatus(400);
      }
    }
  }
  catch {
    res.sendStatus(400);
  }
});

module.exports = router;
