"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          spotId: 2,
          review:
            "Millie tree house is eco-friendly, I love being part of this. Such a fun experience! Nothing like I’ve ever done before.",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 3,
          review:
            "Surrounded by nature, in a tranquil setting, was the perfect way to wrap up our big island trip. Was surreal taking a shower surrounded by trees and the calls of nature. The stay has a well stocked kitchen as well. Really beautiful place",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 1,
          review:
            "Este lugar es increible! Casa de la tierra es como vivir en el ciero",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 4,
          review: "It's way too overpriced!",
          stars: 2,
        },
        {
          userId: 3,
          spotId: 1,
          review: "Me encantan mucho, pero el bano no es grande.",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 2,
          review: "It's needs more cleaning.",
          stars: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
