// backend/routes/api/spots.js
const express = require("express");
const { Op } = require("sequelize");
// const { check } = require("express-validator");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const {
  Spot,
  User,
  Booking,
  SpotImage,
  Review,
  ReviewImage,
} = require("../../db/models");
const router = express.Router();

const createQuerySpotChecker = (req, res, next) => {
  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  page = parseInt(page);
  size = parseInt(size);
  // if (lat < -90 || lat > 90) errors.lat = "Latitude is not valid";
  // if (lng < -180 || lng > 180) errors.lng = "Longitude is not valid";
  const errors = {};

  //Number.isNaN() true if the given value is NaN and its type is Number
  if (page && isNaN(page) && page < 1)
    errors.page = "Page must be greater than or equal to 1";
  if (page && isNaN(page) && page < 1)
    errors.size = "Size must be greater than or equal to 1";
  if (maxLat > 90) errors.maxLat = "Maximum latitude is invalid";
  if (minLat < -90) errors.minLat = "Minimum latitude is invalid";
  if (minLng < -180) errors.minLng = "Maximum longitude is invalid";
  if (maxLng > 180) errors.maxLng = "Minimum longitude is invalid";
  if (minPrice < 0)
    errors.minPrice = "Minimum price must be greater than or equal to 0";
  if (maxPrice < 0)
    errors.maxPrice = "Maximum price must be greater than or equal to 0";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors,
    });
  }

  next();
};

//Get all Spots
router.get("/", createQuerySpotChecker, async (req, res) => {
  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  //pagination
  page = parseInt(page);
  size = parseInt(size);

  if (!page) page = 1;
  if (!size) size = 20;

  //query filter
  const where = {};
  if (minPrice && maxPrice)
    where.price = { [Op.between]: [minPrice, maxPrice] };
  if (maxLat && minLat) where.lat = { [Op.between]: [minLat, maxLat] };
  if (minLng && maxLng) where.lng = { [Op.between]: [minLng, maxLng] };

  const spots = await Spot.findAll({
    include: [{ model: Review }, { model: SpotImage, attributes: ["url"] }],
    where,
    limit: size,
    offset: size * (page - 1),
  });

  let spotWithRatings = spots.map((spot) => {
    let spotJson = spot.toJSON();
    let totalRating = 0;
    let reviews = spotJson.Reviews;

    reviews.forEach((review) => {
      totalRating += review.stars;
    });
    const avgRating = (totalRating / reviews.length).toFixed(2);
    spotJson.avgRating = avgRating;
    if (spotJson.SpotImages.length) {
      spotJson.previewImage = spotJson.SpotImages[0].url;
    }
    delete spotJson.Reviews;
    delete spotJson.SpotImages;

    return spotJson;
  });
  res.json({ Spots: spotWithRatings, page, size });
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
  console.log(
    "logging spot name from api ====================================",
    typeof name
  );
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
  console.log("errors from api =========", errors);
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
  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden, Spot must belong to the current user",
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
      return res.json({
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
      return res.json({
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
    res.status(201);
    res.json(newSpotReview);
  }
);

const createBookingChecker = (req, res, next) => {
  const { startDate, endDate } = req.body;

  const errors = {};
  if (endDate <= startDate)
    errors.endDate = "endDate cannot be on or before startDate";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors,
    });
  }

  next();
};

//Create a Booking for a Spot based on the Spot's id
router.post(
  "/:spotId/bookings",
  requireAuth,
  createBookingChecker,
  async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
      });
    }

    if (spot.ownerId === req.user.id) {
      return res.status(403).json({
        message: "Forbidden, Spot must NOT belong to the current user",
      });
    }

    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const bookingConflicted = await Booking.findOne({
      where: {
        [Op.and]: {
          spotId: req.params.spotId,
          [Op.or]: {
            startDate: { [Op.between]: [startDate, endDate] },
          },
          endDate: { [Op.between]: [startDate, endDate] },
        },
      },
    });
    if (bookingConflicted) {
      res.status(403);
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
    const newSpotBooking = await Booking.create({
      userId: req.user.id,
      spotId: req.params.spotId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });
    //formatting the date with toISOString().split("T")[0] or splice(0, 10)
    res.json({
      id: newSpotBooking.id,
      spotId: newSpotBooking.spotId,
      userId: newSpotBooking.userId,
      startDate: newSpotBooking.startDate.toISOString().split("T")[0],
      endDate: newSpotBooking.endDate.toISOString().split("T")[0],
      createdAt: newSpotBooking.createdAt,
      updatedAt: newSpotBooking.updatedAt,
    });
  }
);

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  let ownerBookings = await Booking.findAll({
    include: [{ model: User, attributes: ["id", "firstName", "lastName"] }],
    where: { spotId: req.params.spotId },
  });
  let userBookings = await Booking.findAll({
    attributes: ["spotId", "startDate", "endDate"],
    where: { spotId: req.params.spotId },
  });
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  //If you ARE NOT the owner of the spot.
  if (spot.ownerId !== req.user.id) {
    return res.json({
      Bookings: userBookings,
    });
  }
  // If you ARE the owner of the spot.
  return res.json({
    Bookings: ownerBookings,
  });
});

//Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  let spots = await Spot.findAll({
    include: [{ model: Review }, { model: SpotImage, attributes: ["url"] }],
    where: { ownerId: req.user.id },
  });

  let userSpots = spots.map((spot) => {
    let spotJson = spot.toJSON();
    let totalRating = 0;
    let reviews = spotJson.Reviews;

    reviews.forEach((review) => {
      totalRating += review.stars;
    });
    const avgRating = (totalRating / reviews.length).toFixed(2);
    spotJson.avgRating = avgRating;
    if (spotJson.SpotImages.length) {
      spotJson.previewImage = spotJson.SpotImages[0].url;
    }
    delete spotJson.Reviews;
    delete spotJson.SpotImages;

    return spotJson;
  });
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
  reviews.forEach((review) => {
    totalRating += review.stars;
  });
  const avgRating = (totalRating / reviews.length).toFixed(2);
  spotJson.avgRating = avgRating;
  delete spotJson.Reviews;
  res.json(spotJson);
});

//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
  let reviews = await Review.findAll({
    include: [
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
      { model: User, attributes: ["id", "firstName", "lastName"] },
    ],
    where: { spotId: req.params.spotId },
  });

  let spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  res.json({
    Reviews: reviews,
  });
});

//Edit spot
router.put("/:spotId", requireAuth, createSpotChecker, async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden, Spot must belong to the current user",
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

//Delete spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden, Spot must belong to the current user",
    });
  }

  await spot.destroy();

  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
