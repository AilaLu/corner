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

// The first error handler is actually just a regular middleware. It will catch any requests that don't match any of the routes defined and create a server error with a status code of 404.
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

const { ValidationError } = require("sequelize");

// The second error handler is for catching Sequelize errors and formatting them before sending the error response.
// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = "Validation error";
    err.errors = errors;
  }
  next(err);
});

// The last error handler is for formatting all the errors before returning a JSON response. It will include the error message, the error messages as a JSON object with key-value pairs, and the error stack trace (if the environment is in development) with the status code of the error message.
// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
