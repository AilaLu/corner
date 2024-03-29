// backend/config/index.js
// read the environment variables loaded and export them. Each environment variable will be read and exported as a key from this file.
module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'path/to/your/database.sqlite', // Path to your SQLite database file
  },
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  dbFile: process.env.DB_FILE,
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
