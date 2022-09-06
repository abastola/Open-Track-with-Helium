var express = require("express");
var database = require("../database");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("homepage");
});

/**
 * API 'GET' Call in /tracker/(userurl)
 * userurl is unique for each device
 */
router.get("/tracker/:userurl", async function (req, res, next) {
  try {
    if (!req.params || !req.params.userurl) {
      return res.send(
        "Device ID is not passed. Please check your URL and try again."
      );
    }

    // Get the device id using url passed in the api call
    var deviceId = await database.GetDeviceIDByDeviceUrl(req.params.userurl);
    // If deviceID is 0 or less, then url is incorrect.
    if (deviceId <= 0) {
      return res.send("Invalid URL. Please check your URL and try again.");
    }

    // Get list of locations using the deviceid.
    var responseData = {
      locations: await database.GetDeviceData({ DeviceID: deviceId }),
    };

    res.render("index", { Response: responseData });
  } catch {
    res.sendStatus(400);
  }
});

module.exports = router;
