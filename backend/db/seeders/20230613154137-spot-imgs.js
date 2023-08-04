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
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-847082891182037366/original/89c9d4d4-9f0f-4753-817b-f1b76f4d5798.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-847082891182037366/original/8dc8dd77-e2be-4473-a575-0833682254a4.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-847082891182037366/original/999bf707-8932-4971-b2df-07bda1aa9fa1.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-847082891182037366/original/25d9e198-65e3-44b2-8857-b49da3ac2273.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-847082891182037366/original/9aeb9a5e-5776-4694-8be9-40f5ab0cd447.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52332034/original/d88568a8-a5b6-4702-894b-4507e943dbeb.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52332034/original/7c605122-4856-492b-a3c8-2850a11b64a2.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/e9ed04ef-5706-44cb-9661-862793eb5220.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52332034/original/285e3868-8f86-4c89-8789-b6d544c384ee.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52332034/original/8b510d20-c157-42be-9f0c-4bc40eadf2d9.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/35836380/a9a49e5f_original.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/83177158/9e5c500b_original.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/83174351/27441c90_original.jpg?im_w=12000",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/83173752/4f45f005_original.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/83171368/8c4b0201_original.jpg?im_w=1200",
          preview: false,
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
