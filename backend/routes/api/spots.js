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
module.exports = router;
