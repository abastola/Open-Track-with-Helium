var express = require("express");
var database = require("../database");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("homepage");
});

/**
 * API 'GET' Call in /tracker/(deviceid)
 * deviceid is unique for each device
 */
router.get("/tracker/:deviceId", async function (req, res, next) {
  try {
    if (!req.params || !req.params.deviceId) {
      return res.send(
        "Device EUI was not passed. Please check your URL and try again."
      );
    }
    var deviceId = req.params.deviceId;
    // Get list of locations using the deviceid.
    var responseData = {
      locations: await database.GetDeviceData({ DeviceID: deviceId }),
    };

    res.render("tracker", { Response: responseData, DeviceEUI: deviceId });
  } catch {
    res.sendStatus(400);
  }
});

module.exports = router;
