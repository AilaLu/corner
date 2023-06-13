"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuyD6NY0YYu5DB-I_K2OZzzqSxuq5TgjwWlR2jd7T9Ap0sRIPmOd5laYySS4m_q46I7Q&usqp=CAU",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTy3bf5SdMNzdB0fDx9xr9HL3an4nSkVVWSAPhOzwIzzT45j4mwuTxxbdr8wv7JwshtY4&usqp=CAU",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZw2eMTnZQ40Xj049trOQ72lZQommvGcDBb8899l4PuEhRVk2JUbnSDpJqJeGsNo9pi8&usqp=CAU",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLs4EJ8Zn7RCjJf6egm_s2p2Is_MoEScXlSw&usqp=CAU",
          preview: true,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
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
