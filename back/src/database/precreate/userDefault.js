const { Users } = require("../../db");
const crypto = require("node:crypto");
const bcrypt = require("bcryptjs");

const createUsers = async () => {
  try {
    const user = {
      Id: crypto.randomUUID(),
      UserName: "admin",
      Password: bcrypt.hashSync("12345", 10)
    };

    await Users.findOrCreate({
      where: { UserName: user.UserName },
      defaults: user,
    });

  } catch (error) {
      console.log(error);
      res.status(500).json({ "msg":"Error al crear usuario"})
  };
};

module.exports = { createUsers };