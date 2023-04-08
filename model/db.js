const {Sequelize} = require('sequelize')
const dotenv = require('dotenv');
dotenv.config();

const {
  DB_USERNAME = '',
  DB_PASSWORD = '',
  DB_URL = '',
  DB_PORT = '5432',
  DB_NAME = '',
} = process.env;


const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_URL,
  port: +DB_PORT,
  dialect: 'postgres',
});

module.exports = sequelize