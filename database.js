const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");

/**Create tracker.db */
const db_name = path.join(__dirname, "data", "tracker.db");
const dbPromise = open({
  filename: db_name,
  driver: sqlite3.Database,
});

/**
 * Setup the required tables
 */
Build = async () => {
  console.log("DB Filename: ", db_name);
  const db = await dbPromise;

  const LocationsQuery =
    "CREATE TABLE IF NOT EXISTS Locations (ID INTEGER PRIMARY KEY AUTOINCREMENT, DeviceID INTEGER NOT NULL, Latitude REAL NOT NULL, Longitude REAL NOT NULL, Time DATETIME NOT NULL)";

  const DeviceURLQuery =
    "CREATE TABLE IF NOT EXISTS DeviceURL ( DeviceID INTEGER NOT NULL PRIMARY KEY, URL VARCHAR(2048) NULL)";

  await db.exec(LocationsQuery);
  await db.exec(DeviceURLQuery);
};

/**
 * Get all fields from Locations table where DeviceID is deviceData.DeviceID
 * @param {json} deviceData { DeviceID: value }
 */
GetDeviceData = async (deviceData) => {
  const db = await dbPromise;
  console.log(
    "Query: ",
    `SELECT * FROM Locations where DeviceID = ${deviceData.DeviceID}`
  );
  var dataset = [];
  const results = await db.all(
    "SELECT * FROM Locations where DeviceID = ?",
    deviceData.DeviceID
  );
  for (each of results) {
    dataset.push([each.Time, each.DeviceID, each.Latitude, each.Longitude]);
  }

  return dataset;
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
  const db = await dbPromise;
  console.log(
    "INSERT INTO Locations(DeviceID, Latitude, Longitude, Time) VALUES (?, ?, ?, ?)",
    deviceData.DeviceID,
    deviceData.Latitude,
    deviceData.Longitude,
    deviceData.Time
  );
  await db.run(
    "INSERT INTO Locations(DeviceID, Latitude, Longitude, Time) VALUES (?, ?, ?, ?)",
    [
      deviceData.DeviceID,
      deviceData.Latitude,
      deviceData.Longitude,
      deviceData.Time,
    ]
  );
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
