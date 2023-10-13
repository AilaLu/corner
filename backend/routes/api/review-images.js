// backend/routes/api/reviewImages.js
const express = require("express");
const { Op } = require("sequelize");
// const { createReviewChecker } = require("../api/spots");
// const { check } = require("express-validator");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Review, ReviewImage } = require("../../db/models");
const router = express.Router();

//Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  let reviewImg = await ReviewImage.findByPk(req.params.imageId, {
    include: [{ model: Review }],
  });

  if (!reviewImg) {
    res.status(404);
    return res.json({
      message: "Review Image couldn't be found",
    });
  }

  if (reviewImg.Review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden, Review must belong to the current user",
    });
  }

  await reviewImg.destroy();

  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
