// backend/routes/api/spotImages.js
const express = require("express");
const { Op } = require("sequelize");
// const { createReviewChecker } = require("../api/spots");
// const { check } = require("express-validator");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, SpotImage } = require("../../db/models");
const router = express.Router();

// Delete a Spot Image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  let spotImg = await SpotImage.findByPk(req.params.imageId, {
    include: [{ model: Spot }],
  });

  if (!spotImg) {
    res.status(404);
    return res.json({
      message: "Spot Image couldn't be found",
    });
  }

  if (spotImg.Spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden, Spot must belong to the current user",
    });
  }

  await spotImg.destroy();

  res.json({
    message: "Successfully deleted",
  });
});
module.exports = router;
