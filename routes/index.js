var express = require("express");
var database = require("../database");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("homepage");
});

/* GET home page. */
router.get("/tracker/:userurl", async function (req, res, next) {
  try {
    if (!req.params || !req.params.userurl) {
      return res.send(
        "URL is not passed. Please check your URL and try again."
      );
    }
    var deviceId = await database.GetDeviceIDByDeviceUrl(req.params.userurl);
    console.log("Device ID: ", deviceId);
    if (deviceId <= 0) {
      return res.send("Invalid URL. Please check your URL and try again.");
    }

    var responseData = {
      locations: await database.GetDeviceData({ DeviceID: deviceId }),
    };

    res.render("index", { Response: responseData });
  } catch {
    res.sendStatus(400);
  }
});

module.exports = router;
