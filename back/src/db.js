"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const { log } = require("console");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/database/config/config.js")[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "database", "models"))
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    modelDefiners.push(
      require(path.join(__dirname, "database", "models", file))
    );
  });

modelDefiners.forEach((modelDefiner) => modelDefiner(sequelize));

const {
  Users,
  Tasks
} = sequelize.models;

Users.hasMany(Tasks, { foreingKey: "User_Id" });
Tasks.belongsTo(Users, { foreingKey: "User_Id" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};