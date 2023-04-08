
const sequelize = require('./db');

const { DataTypes, Model } = require('sequelize');
class Location extends Model {}

Location.init({
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  DeviceID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Latitude: {
    type: DataTypes.REAL,
    allowNull: false
  },
  Longitude: {
    type: DataTypes.REAL,
    allowNull: false
  },
  Time: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false,
  sequelize,
  modelName: 'Location'
})

module.exports = Location;