const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");

/**Create tracker.db */
const db_name = path.join(__dirname, "data", "tracker.db");
const dbPromise = open({
  filename: db_name,
  driver: sqlite3.Database,
});

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
 *
 * @param {json} deviceData .DeviceID
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
 *
 * @param {string} userurl
 */
GetDeviceIDByDeviceUrl = async (userurl) => {
  const db = await dbPromise;
  console.log(
    "Query: ",
    `select deviceid from DeviceURL where url = '${userurl}'`
  );
  const data = await db.get(
    "select deviceid from DeviceURL where url = ?",
    userurl
  );
  return data.DeviceID;
};

/**
 *
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
 *
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

if (typeof module !== "undefined" && !module.parent) {
  Build();
  // AddDeviceData({
  //   DeviceID: 1,
  //   Latitude: 40.8564,
  //   Longitude: -73.9622,
  //   Time: "2022-08-14 22:06:52",
  // });
  // AddDeviceURL({ DeviceID: 2, URL: "test" });
  // GetDeviceIDByDeviceUrl("test");
  // GetDeviceData({ DeviceID: 1 });
}

module.exports = {
  Build,
  GetDeviceData,
  GetDeviceIDByDeviceUrl,
  AddDeviceData,
  AddDeviceURL,
};
