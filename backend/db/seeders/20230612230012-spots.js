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
          description:
            "a brand new and fully off-grid 12 feet high tree house on 2 acres of tropical rainforest on the Big Island of Hawaii. Experience stargazing like no where else in the world, while warming up at the camp fire. Chill out in the large hanging net or spend rainy days in the hot bath tub. Wake up to your yoga routine on the spacious deck in this tranquil hide out. Conveniently located right between Hilo and VOLCANO NATIONAL PARK.",
          price: 250,
        },
        {
          ownerId: 1,
          address: "5, Chapel Ct",
          city: "Greentown",
          state: "Pennsylvania",
          country: "United States",
          // lat: 37.7645358,
          // lng: -122.4730327,
          name: "“Treehouse Heaven” Lakehouse",
          description:
            "This 3 bedroom & 2 full bath lakefront chalet is located on a very desirable cove at Lake Wallenpaupack and features a lake front view from the large two story deck. Lounge in the sun and take a dip in the lake off the private dock. Enjoy beautiful sunsets while roasting smores and telling campfire stories around the fire pit.",
          price: 500,
        },
        {
          ownerId: 2,
          address: "15, ShieBhauser Str",
          city: "Holzminden",
          state: "Niedersachsen",
          country: "Germany",
          // lat: 37.7645358,
          // lng: -122.4730327,
          name: "Glamping in the Reindeer Grounds",
          description:
            "Enjoy the beautiful surroundings of this romantic spot in nature without sacrificing comfort. You have the unique reindeer glamping here and the chance to get very close to the animals. In addition, tours with the reindeer and huskies are possible.",
          price: 97,
        },
        {
          ownerId: 3,
          address: "12, Volcano Rd",
          city: "Mountain View",
          state: "Hawaii",
          country: "United States",
          // lat: 37.7645358,
          // lng: -122.4730327,
          name: "🍃 Hawaiian Tree House 🍃 Peaceful Glamping Retreat",
          description:
            "BAUMHAUS - a brand new and fully off-grid 12 feet high tree house on 2 acres of tropical rainforest on the Big Island of Hawaii. Experience stargazing like no where else in the world, while warming up at the camp fire. Chill out in the large hanging net or spend rainy days in the hot bath tub. Wake up to your yoga routine on the spacious deck in this tranquil hide out. Conveniently located right between Hilo and VOLCANO NATIONAL PARK.",
          price: 174,
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
            "“Treehouse Heaven” Lakehouse",
            "Glamping in the Reindeer Grounds",
            "🍃 Hawaiian Tree House 🍃 Peaceful Glamping Retreat",
          ],
        },
      },
      {}
    );
  },
};
