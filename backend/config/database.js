// backend/config/database.js
// This will allow you to load the database configuration environment variables from the .env file into the config/index.js, as well as define the global schema for the project.
const config = require("./index");

module.exports = {
  development: {
    storage: config.dbFile, //dev phase read from file
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true,
  },
  production: {
    use_env_variable: "DATABASE_URL", //production phase read from a url
    dialect: "postgres",
    seederStorage: "sequelize",
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
    define: {
      schema: process.env.SCHEMA,
    },
  },
};
