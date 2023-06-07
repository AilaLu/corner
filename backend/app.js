const express = require("express");
require("express-async-errors");
const morgan = require("morgan"); //- logging information about server requests/responses
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet"); // - security middleware
const cookieParser = require("cookie-parser");

const { environment } = require("./config");
const isProduction = environment === "production";
// Create a variable called isProduction that will be true if the environment is in production or not by checking the environment key in the configuration file (backend/config/index.js)

const app = express(); //Initialize the Express application:

app.use(morgan("dev")); //Connect the morgan middleware for logging information about requests and responses:

app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development, CORS isn't needed in production since all of our React and Express resources will come from the same origin.
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

const routes = require("./routes");

// ...

app.use(routes); // Connect all the routes

module.exports = app;
