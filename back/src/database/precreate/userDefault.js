const { Users } = require("../../db");

const createUsers = async () => {
  const user = {
    Id: 0,
    UserName: "admin",
    Password: "12345"
  }
    await Users.findOrCreate({
      where: { Id: user.Id },
      defaults: user,
    });
};

module.exports = { createUsers };