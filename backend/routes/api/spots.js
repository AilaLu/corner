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

//Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
    });
  }
  const { url, preview } = req.body;
  const newSpotImg = await SpotImage.create({
    spotId: req.params.spotId,
    url,
    preview,
  });
  res.json({
    id: newSpotImg.id,
    url: newSpotImg.url,
    preview: newSpotImg.preview,
  });
});

const createReviewChecker = (req, res, next) => {
  const { review, stars } = req.body;

  const errors = {};
  if (!review) errors.review = "Review text is required";
  if (isNaN(stars) || stars > 5 || stars < 1)
    errors.stars = "Stars must be an integer from 1 to 5";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors,
    });
  }

  next();
};
//Create a Review for a Spot based on the Spot's id
router.post(
  "/:spotId/reviews",
  requireAuth,
  createReviewChecker,
  async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      res.status(404);
      res.json({
        message: "Spot couldn't be found",
      });
    }
    const reviewExisted = await Review.findOne({
      where: {
        userId: req.user.id,
        spotId: req.params.spotId,
      },
    });
    if (reviewExisted) {
      res.status(403); //or 500 in ReadMe
      res.json({
        message: "User already has a review for this spot",
      });
    }
    const { review, stars } = req.body;
    const newSpotReview = await Review.create({
      userId: req.user.id,
      spotId: req.params.spotId,
      review,
      stars,
    });
    res.json(newSpotReview.id);
  }
);

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

router.put("/:spotId", requireAuth, createSpotChecker, async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);
  if (spot.ownerId !== req.user.id) {
    res.status(401);
    return res.json({
      message: "Spot must belong to the current user",
    });
  }
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const editSpot = await spot.update({
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
  res.json(editSpot);
});

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await spot.destroy();

  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
