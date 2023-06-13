"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-quuK7IpLxWQSQUkK_LFh_iq-X29Xsv91g&usqp=CAU",
        },
        {
          reviewId: 2,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Ujx78Oyzp4m_SRGa09uzvtNv5iL_1POfPg&usqp=CAU",
        },
        {
          reviewId: 3,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJbxGbNn0rHf6Fk3-5bCnnb_YEl7OFzdJGWw&usqp=CAU",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        reviewId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
