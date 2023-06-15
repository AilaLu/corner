// backend/routes/api/reviews.js
const express = require("express");
const { Op } = require("sequelize");
// const { createReviewChecker } = require("../api/spots");
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

// Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);
  console.log(review);
  if (!review) {
    res.status(404);
    res.json({
      message: "Review couldn't be found",
    });
  }
  if (review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden, review must belong to the current user",
    });
  }
  let reviewImgsCount = await ReviewImage.count({
    where: {
      reviewId: req.params.reviewId,
    },
  });
  if (reviewImgsCount >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });
  }

  const newReviewImg = await ReviewImage.create({
    reviewId: req.params.reviewId,
    url: req.body.url,
  });
  res.json({
    id: newReviewImg.id,
    url: newReviewImg.url,
  });
});

// Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
  let reviews = await Review.findAll({
    include: [
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
      { model: User, attributes: ["id", "firstName", "lastName"] },
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
      },
    ],
    where: { userId: req.user.id },
  });
  // let reviewsJson = reviews.toJSON();
  // let reviewswSpotImg = reviewsJson.map(async (review) => {
  //   review.Spot.previewImage = await Spot.findOne({
  //     where: {
  //       id: review.spotId,
  //     },
  //   }).SpotImages[0].url;
  // });
  res.json({
    Reviews: reviews,
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

//Edit review
router.put("/:reviewId", requireAuth, createReviewChecker, async (req, res) => {
  let review = await Review.findByPk(req.params.reviewId);
  if (review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden, review must belong to the current user",
    });
  }
  if (!review) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
    });
  }

  const editReview = await review.update({
    review: req.body.review,
    stars: req.body.stars,
  });
  res.json(editReview);
});

//Delete review
router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  let review = await Review.findByPk(req.params.reviewId);

  if (!review) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
    });
  }

  if (review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden, review must belong to the current user",
    });
  }

  await review.destroy();

  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
