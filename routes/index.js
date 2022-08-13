var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("homepage");
});

/* GET tracker page */
router.get("/tracker", function (req, res, next) {
  var locations = [
    ["8/11/2022, 8:11:59 PM", 11.8166, 122.0942],
    ["8/11/2022, 8:13:59 PM", 11.8202, 122.0621],
    ["8/11/2022, 8:12:59 PM", 11.8804, 122.0189],
    ["8/11/2022, 8:16:59 PM", 11.8929, 122.0125]
  ];

  var responseData = {
    title: "John Doe's Location",
    locations: locations,
  };

  res.render("index", { Response: responseData });
});

/* GET home page. */
router.get("/tracker/:userurl", async function (req, res, next) {
  var deviceId = await database.GetDeviceIDByDeviceUrl(req.params.userurl);
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
