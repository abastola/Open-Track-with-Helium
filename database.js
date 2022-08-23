require("dotenv").config();
var pg = require("pg");

var connString = process.env.POSTGRES_CONNSTRING;
var pool = new pg.Pool({
  host: 'ziggy.db.elephantsql.com',
  user: 'dkbymgrx',
  password: 'v8EKHYLx_HSX5_LwvPnmcysfuQZU4SV1',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

build = function () {
  pool
    .connect()
    .then(client => {
      client.query('SELECT NOW() AS "theTime"', (err, result) => {
        if (err) {
          return console.error("error running query", err);
        }
        console.log(result.rows[0].theTime);
        client.release();
      });
    })
    .catch(err => {return console.error("could not connect to postgres", err);});  

  var query =
    "CREATE TABLE IF NOT EXISTS Locations (ID SERIAL PRIMARY KEY, DeviceID INT NOT NULL, Latitude FLOAT NULL, Longitude FLOAT NULL, Time TIMESTAMP NULL)";

  pool
    .query(query)
    .catch(err => console.error("error running query: ", query, err));

  query =
    "CREATE TABLE IF NOT EXISTS DeviceURL ( DeviceID INT NOT NULL PRIMARY KEY, URL VARCHAR(2048) NULL)";

  pool
    .query(query)
    .catch(err => console.error("error running query: ", query, err));
};

/**
 *
 * @param {json} deviceData .DeviceID
 */
getDeviceData = (deviceData, callback) => {
  console.log(
    "Query: ",
    `SELECT * FROM Locations where DeviceID = ${deviceData.DeviceID};`
  );
  client.query(
    `SELECT * FROM Locations where DeviceID = ${deviceData.DeviceID};`,
    (error, results) => {
      var dataset = [];
      if (error) {
        console.log(error);
        throw error;
      } else if (results.rows.length > 0) {
        for (each of results.rows) {
          dataset.push([each.time, each.deviceid, each.latitude, each.longitude]);
        }
        console.log("DATASET: ", dataset)
        callback(null, dataset);
      } else {
        console.log("No data found!");
        callback(null, null);
      }
    }
  );
};

/**
 *
 * @param {string} userurl 
 */
GetDeviceIDByDeviceUrl = async (userurl) => {
  console.log(
    "Query: ",
    `select deviceid from DeviceURL where url = '${userurl}' limit 1;`
  );
  const deviceId = await client.query(
    `select deviceid from DeviceURL where url = '${userurl}' limit 1;`);

  if (deviceId.rowCount > 0) {
    // console.log("DeviceID: ", deviceId.rows[0].deviceid)
    return deviceId.rows[0].deviceid;
  }
  else {
    return 0;
  }
};


/**
 *
 * @param {*} deviceData  {DeviceID: <ID>}
 * @param {*} callback (error, {URL: 'url'})
 */
getDeviceURL = (deviceData, callback) => {
  console.log(
    `SELECT URL FROM DeviceURL where DeviceID = ${deviceData.DeviceID};`
  );
  client.query(
    `SELECT URL FROM DeviceURL where DeviceID = ${deviceData.DeviceID};`,
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      } else if (results.rows.length > 1) {
        console.log("Multiple records found!");
        callback(null, null);
      } else {
        callback(null, results.rows[0]);
      }
    }
  );
};

/**
 *
 * @param {*} deviceData {URL : 'url'}
 * @param {*} callback (err, result)
 */
getDeviceID = (deviceData, callback) => {
  client.query(
    `SELECT DeviceID FROM DeviceURL where URL = '${deviceData.URL}';`,
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      } else if (results.rows.length > 1) {
        console.log("Multiple records found!");
        callback(null, null);
      } else {
        callback(null, results.rows[0]);
      }
    }
  );
};

/**
 *
 * @param {json} deviceData {DeviceID: , Latitude: , Longitude: , Time: ''}
 */
addDeviceData = (deviceData) => {
  client.query(
    `INSERT INTO Locations(DeviceID, Latitude, Longitude, Time) VALUES (${deviceData.DeviceID}, ${deviceData.Latitude}, ${deviceData.Longitude}, '${deviceData.Time}')`,
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};

/**
 *
 * @param {json} deviceData {DeviceID: , URL: ''}
 */
addDeviceURL = (deviceData) => {
  console.log(
    `INSERT INTO DeviceURL (DeviceID, URL) VALUES (${deviceData.DeviceID}, '${deviceData.URL}')`
  );
  client.query(
    `INSERT INTO DeviceURL (DeviceID, URL) VALUES (${deviceData.DeviceID}, '${deviceData.URL}')`,
    (error) => {
      if (error) {
        // console.log(error);
        throw error;
      }
      console.log("Locations URL added:", deviceData.URL);
    }
  );
};

// build();
// addDeviceURL({DeviceID:2, URL:'testur2'});
// addDeviceData({DeviceID: 1, Latitude: 12.0, Longitude: 7.0, Time: '20220101'});
// getDeviceURL({ DeviceID: 1 }, (e, r) => console.log("Locations url", r));
// getDeviceID({ URL: "testurl" }, (e, r) => console.log("DeviceID: ", r));
// getDeviceData({DeviceID: 1}, (e, r) => console.log("Locations data",r));
// console.log("Locations URL:", d.URL);

module.exports = {
  getDeviceData,
  getDeviceID,
  getDeviceURL,
  addDeviceData,
  addDeviceURL,
  build,
  GetDeviceIDByDeviceUrl
};
