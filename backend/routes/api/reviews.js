// backend/routes/api/reviews.js
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

module.exports = router;
