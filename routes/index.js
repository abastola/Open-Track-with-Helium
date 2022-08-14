var express = require("express");
var database = require("../database")
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("homepage");
});


/* GET home page. */
router.get("/tracker/:userurl", async function (req, res, next) {
  var deviceId = await database.GetDeviceIDByDeviceUrl(req.params.userurl);
  console.log("Device ID: ", deviceId)
  if (deviceId <= 0) {
    // to do
    // res.render error page.
  }

  database.getDeviceData({ DeviceID: deviceId }, (request, response) => {
    console.log("Device ID: ", response)
    var responseData = {
      locations: response,
    };

    res.render("index", { Response: responseData });
  });
});



module.exports = router;
