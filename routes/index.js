var express = require("express");
var database = require("../database");
var router = express.Router();
var createError = require("http-errors");

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
    if (!req?.params?.deviceId) {
      return res.send(
        "INVALID Device ID. Please check your URL and try again."
      );
    }

    const deviceId = req.params.deviceId;
    // Get list of locations using the deviceid.
    const responseData = {
      locations: await database.GetDeviceData({ DeviceID: deviceId }),
    };

    if (responseData?.locations?.length) {
      return res.render("tracker", { Response: responseData });
    } else {
      throw new createError.NotFound("Device not found");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
