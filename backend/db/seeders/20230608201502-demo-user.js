"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Demo",
          lastName: "lition",
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Millie",
          lastName: "Gubed",
          email: "mil_g@user.io",
          username: "mil",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Deven",
          lastName: "Walter",
          email: "d_walter45@user.io",
          username: "dev",
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "mil", "dev"] },
      },
      {}
    );
  },
};
