// backend/routes/api/spots.js
const express = require("express");
// const { Op } = require("sequelize");
// const { check } = require("express-validator");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, User, Booking, SpotImage, Review } = require("../../db/models");
const router = express.Router();

//Get all Spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: [{ model: Review }, { model: SpotImage, attributes: ["url"] }],
  });

  let spotWithRatings = spots.map((spot) => {
    let spotJson = spot.toJSON();
    // console.log(spot);
    let totalRating = 0;
    let reviews = spotJson.Reviews;
    // console.log(reviews);

    reviews = reviews.map((review) => {
      totalRating += review.stars;
      // console.log(totalRating);
    });
    const avgRating = totalRating / reviews.length;
    spotJson.avgRating = avgRating;
    // console.log(spot);
    if (spotJson.SpotImages.length) {
      spotJson.previewImage = spotJson.SpotImages[0].url;
    }
    delete spotJson.Reviews;
    delete spotJson.SpotImages;

    return spotJson;
  });
  // console.log(spotWithRatings);
  res.json({ Spots: spotWithRatings });
});

//Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  let spots = await Spot.findAll({
    include: [{ model: Review }, { model: SpotImage, attributes: ["url"] }],
    where: { ownerId: req.user.id },
  });

  let userSpots = spots.map((spot) => {
    let spotJson = spot.toJSON();
    // console.log(spot);
    let totalRating = 0;
    let reviews = spotJson.Reviews;
    // console.log(reviews);

    reviews = reviews.map((review) => {
      totalRating += review.stars;
      // console.log(totalRating);
    });
    const avgRating = totalRating / reviews.length;
    spotJson.avgRating = avgRating;
    // console.log(spot);
    if (spotJson.SpotImages.length) {
      spotJson.previewImage = spotJson.SpotImages[0].url;
    }
    delete spotJson.Reviews;
    delete spotJson.SpotImages;

    return spotJson;
  });
  // console.log(userSpots);
  res.json({ Spots: userSpots });
});

//Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: Review },
      { model: SpotImage, attributes: ["id", "url", "preview"] },
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
    ],
  });
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  let spotJson = spot.toJSON();
  let reviews = spotJson.Reviews;
  spotJson.numReviews = reviews.length;
  let totalRating = 0;
  reviews = reviews.map((review) => {
    totalRating += review.stars;
  });
  const avgRating = totalRating / reviews.length;
  spotJson.avgRating = avgRating;
  delete spotJson.Reviews;
  res.json(spotJson);
});

const createSpotChecker = (req, res, next) => {
  const {
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  } = req.body;

  const errors = {};
  if (!address) errors.address = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!country) errors.country = "Country is required";
  if (lat < -90 || lat > 90) errors.lat = "Latitude is not valid";
  if (lng < -180 || lng > 180) errors.lng = "Longitude is not valid";
  if (name.length >= 50) errors.name = "Name must be less than 50 )characters";
  if (!description) errors.description = "Description is required";
  if (!price) errors.price = "Price per day is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors,
    });
  }

  next();
};

//Create a Spot
router.post("/", requireAuth, createSpotChecker, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  // const owner = await User.findOne({
  //   where: { id: req.user.id },
  // });

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  res.status(201);
  res.json(newSpot);
});

module.exports = router;