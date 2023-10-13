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
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-847082891182037366/original/999bf707-8932-4971-b2df-07bda1aa9fa1.jpeg?im_w=1200",

          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-847082891182037366/original/8dc8dd77-e2be-4473-a575-0833682254a4.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-847082891182037366/original/89c9d4d4-9f0f-4753-817b-f1b76f4d5798.jpeg?im_w=1200",
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
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52332034/original/7c605122-4856-492b-a3c8-2850a11b64a2.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52332034/original/d88568a8-a5b6-4702-894b-4507e943dbeb.jpeg?im_w=1200",
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
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-50445753/original/cf92cc9d-427f-407f-8f50-caa3ce2c529b.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-50445753/original/e566a73d-6478-46f6-aea0-fe485464425f.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-50445753/original/48a2a481-64ff-4849-8140-b26fffd06e96.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-50445753/original/1c2e26d2-139e-4c8d-8476-3aba06337b0c.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-50445753/original/ff823ce2-aa54-46b3-a614-c7c6a54101ac.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-680744751508662207/original/018c759c-91f7-471d-ae77-26ab4fa64b43.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-680744751508662207/original/a70aa550-667e-48e6-95b3-1ad570a2dafb.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-680744751508662207/original/724010ab-0ea2-44d4-be38-8bb77520c3a5.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-680744751508662207/original/03c49275-d7cf-4e5f-be21-90acefaa745b.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-680744751508662207/original/2b2f3304-c92e-46e6-91d7-01f99496f589.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/ad93aae0-546d-4982-b886-4cda65d48749.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-622003186786447929/original/7d790c35-a0ff-4462-bf06-6a78e1c4ad8c.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-622003186786447929/original/78e9818d-7fa4-419f-93d8-22970a140d18.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-622003186786447929/original/7f8304f1-fb0e-49a7-99a0-9c2d9dbf3371.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-622003186786447929/original/a271a83a-389a-4c73-8027-f02e2d9168c8.jpeg?im_w=720",
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
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] },
      },
      {}
    );
  },
};
