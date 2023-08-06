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
        {
          userId: 1,
          spotId: 5,
          review:
            "It was a great experience! Axel is a great host! We felt very comfortable and would definitely come back!",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 5,
          review:
            "The overnight stay in the reindeer enclosure was just something super special! The grounds are beautifully located and not only offer a unique experience as such. Surrounded by numerous hiking trails and beautiful nature, the accommodation is definitely worth a trip not only because of the reindeer and the super cozily furnished tent! ",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 5,
          review:
            "Unfortunately, although we did not have that much luck with the weather (a lot of wind and strong rain), we could totally enjoy the overnight stay. The host is very friendly and friendly and leaves you with confidence in a private atmosphere after you check in. The reindeer are trustworthy and the feeding was just a lot of fun!",
          stars: 4,
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
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] },
      },
      {}
    );
  },
};
