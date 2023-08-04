"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "18, Vista del Sol",
          city: "Brisas de Zicatela",
          state: "Oaxaca",
          country: "Mexico",
          // lat: 37.7645358,
          // lng: -122.4730327,
          name: "Casa de la tierra",
          description:
            "Welcome to a dreamy tree house to live for a few days with a small footprint but without sacrificing beauty or comfort! This unique bamboo home stands on the edge of a little hill with stunning views over Zicatela beach and the montains in the distance. The wildness feel of the pacific ocean is enhanced by the charm of local hospitality.",
          price: 307,
        },
        {
          ownerId: 2,
          address: "63, Raya Desea Sambangan",
          city: "Kecamatan Sukasada",
          state: "Bali",
          country: "Indonesia",
          // lat: 37.7645358,
          // lng: -122.4730327,
          name: "Millie tree house",
          description:
            "A dream come true for me after building this eco-friendly, all wood, bamboo and straw tree house between a lush green valley and mountain stream! I wish to share this dream with you.The Milli Tree House has a cozy queen size bedroom with large windows on all 4 sides with views of luscious green. A small triangle deck on one side, overlooks a stunning valley and mountains, and another rectangle deck in the back, high and directly above a lovely mountain stream.",
          price: 86,
        },
        {
          ownerId: 3,
          address: "12, Volcano Rd",
          city: "Mountain View",
          state: "Hawaii",
          country: "United States",
          // lat: 37.7645358,
          // lng: -122.4730327,
          name: "Retreat mountain view",
          description: "Place where web developers are created",
          price: 250,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Casa de la tierra",
            "Millie tree house",
            "Retreat mountain view",
          ],
        },
      },
      {}
    );
  },
};
