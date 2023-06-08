"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("Users", {
      fields: ["username", "email"],
      unique: true,
      name: "idx_unique_user_name_email",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Users", "idx_unique_user_name_email");
  },
};
