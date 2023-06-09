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
          startDate: "2021-11-19",
          endDate: "2021-11-20",
        },
        {
          spotId: 1,
          userId: 3,
          startDate: "2021-12-19",
          endDate: "2021-12-20",
        },
        {
          spotId: 1,
          userId: 3,
          startDate: "2022-1-19",
          endDate: "2022-1-20",
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
        startDate: { [Op.in]: ["2021-11-19", "2021-12-19", "2022-1-19"] },
      },
      {}
    );
  },
};
