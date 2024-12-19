const {DB_USER_NAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT} = require("../../config.js");

module.exports = {
  "development": {
    "username": DB_USER_NAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "postgres",
    "logging": false
  }
};