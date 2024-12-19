const express = require("express");
const methodOverride = require("method-override");

const server = express();
const { conn } = require("./src/db.js");
const { PORT } = require("./src/config.js");

const indexRoutes = require("./src/routes.js/indexRoutes");
const {createUsers} = require("./src/database/precreate/userDefault");

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(methodOverride("_method"));

server.use(indexRoutes);

const startServer = async () => {
    try {
      await conn.sync({ alter: true });
      await createUsers();
  
      server.listen(PORT, () => {
        console.log(`Server listening at ${PORT}`);
      });
    } catch (error) {
      console.error("Error syncing database:", error);
    }
};
  
startServer();