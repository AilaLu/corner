"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 3,
          startDate: new Date("2024-1-19"),
          endDate: new Date("2024-1-20"),
        },
        {
          spotId: 2,
          userId: 3,
          startDate: new Date("2024-3-19"),
          endDate: new Date("2024-3-20"),
        },
        {
          spotId: 2,
          userId: 1,
          startDate: new Date("2023-12-24"),
          endDate: new Date("2024-1-20"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        startDate: { [Op.in]: ["2024-1-19", "2024-3-19", "2023-12-24"] },
      },
      {}
    );
  },
};
