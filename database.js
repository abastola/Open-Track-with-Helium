// const sqlite3 = require("sqlite3").verbose();
// const { open } = require("sqlite");
const path = require("path");
const dotenv = require('dotenv');
const sequelize = require("./model/db");
const Location = require("./model/location.model");
dotenv.config();

// /**Create tracker.db */
// const db_name = path.join(__dirname, "data", "tracker.db");
// const dbPromise = open({
//   filename: db_name,
//   driver: sqlite3.Database,
// });


/**
 * Setup the required tables
 */
Build = async () => {

  console.log('Making a connection...')
  const res = await Location.sync({ force: false });

  console.log("Syncing done ")

};

/**
 * Get all fields from Locations table where DeviceID is deviceData.DeviceID
 * @param {json} deviceData { DeviceID: value }
 */
GetDeviceData = async (deviceData) => {
  try {
    const result = await Location.findAll({
      where: {
        DeviceID: deviceData.DeviceID
      },
      attributes: ['DeviceID', 'Latitude', 'Longitude', 'Time']
    });
    const dataset = [];

    for (each of result) {
      dataset.push([each.Time, each.DeviceID, each.Latitude, each.Longitude])
    }

    return dataset;
  } catch (error) {
    console.log(`DB Error: Cannot fetch device data for::: ${deviceData.DeviceID}`);
    return [];
  }
};

/**
 * Get the DeviceID for the userurl
 * @param {string} userurl
 */
GetDeviceIDByDeviceUrl = async (userurl) => {
  const db = await dbPromise;
  console.log(
    "Query: ",
    `select DeviceID from DeviceURL where url = '${userurl}'`
  );
  const data = await db.get(
    "select DeviceID from DeviceURL where url = ?",
    userurl
  );
  return data.DeviceID;
};

/**
 * Add device location data to the Locations table.
 * @param {json} deviceData {DeviceID: , Latitude: , Longitude: , Time: ''}
 */
AddDeviceData = async (deviceData) => {
  const {DeviceID, Latitude, Longitude, Time} = deviceData;

  try {
    const result = await Location.create({
      DeviceID,
      Latitude,
      Longitude,
      Time
    });
    return result;
  } catch (error) {
    console.error(`Error during insertion::: ${JSON.stringify(deviceData, null, 2)}`)
  }
};

/**
 * Add Device URL to the URL tables
 * @param {json} deviceData {DeviceID: , URL: ''}
 */
AddDeviceURL = async (deviceData) => {
  const db = await dbPromise;
  console.log(
    `INSERT INTO DeviceURL (DeviceID, URL) VALUES (${deviceData.DeviceID}, ${deviceData.URL})`
  );
  await db.run("INSERT INTO DeviceURL (DeviceID, URL) VALUES (?, ?)", [
    deviceData.DeviceID,
    deviceData.URL,
  ]);
};

module.exports = {
  Build,
  GetDeviceData,
  GetDeviceIDByDeviceUrl,
  AddDeviceData,
  AddDeviceURL,
};
