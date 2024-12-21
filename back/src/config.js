require("dotenv").config();
const {
  PORT,
  DB_USER_NAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  JWT_SECRET,
  NODE_ENV,
  CORS_DOMAIN
} = process.env;

module.exports = {
  PORT,
  DB_USER_NAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  JWT_SECRET,
  NODE_ENV,
  CORS_DOMAIN
};