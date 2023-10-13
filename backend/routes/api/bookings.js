// backend/routes/api/bookings.js
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

// Get all bookings of the Current User
router.get("/current", requireAuth, async (req, res) => {
  let bookings = await Booking.findAll({
    include: [
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
        include: [{ model: SpotImage, attributes: ["url"] }],
      },
    ],
    where: { userId: req.user.id },
  });
  let bookingsWSpotImg = bookings.map((booking) => {
    let bookingJson = booking.toJSON();
    if (bookingJson.Spot.SpotImages.length) {
      bookingJson.Spot.previewImage = bookingJson.Spot.SpotImages[0].url;
    }
    delete bookingJson.Spot.SpotImages;
    return bookingJson;
  });
  res.json({
    Bookings: bookingsWSpotImg,
  });
});

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
//Edit booking
router.put(
  "/:bookingId",
  requireAuth,
  createBookingChecker,
  async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
      res.status(404);
      return res.json({
        message: "booking couldn't be found",
      });
    }
    if (booking.userId !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden, booking must belong to the current user",
      });
    }
    let { startDate, endDate } = req.body;
    //make the String type startDate, endDate into Date type, because the database has the startDate, endDate as Datatype, you need it to try to find booking from Bookings table
    startDate = new Date(startDate); //making startDate into Date type
    endDate = new Date(endDate); //making endDate into Date type
    const today = new Date();
    //dayDate = "2023-06-15T23:15:29.719Z"
    //= dayString = day.toISOString().split("T")[0];
    //datString = "2023-06-15"
    if (today > endDate) {
      //today, startDate, endDate are all Strings type
      return res.status(403).json({
        message: "Past bookings can't be modified",
      });
    }
    const bookingConflicted = await Booking.findOne({
      where: {
        [Op.and]: {
          spotId: booking.spotId,
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
    const editBooking = await booking.update({
      startDate,
      endDate,
    });
    res.json(editBooking);
  }
);

//Delete booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  let booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    res.status(404);
    return res.json({
      message: "booking couldn't be found",
    });
  }
  let spot = await Spot.findByPk(booking.spotId);
  if (booking.userId !== req.user.id && spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message:
        "Forbidden, booking must belong to the current user or the Spot must belong to the current user",
    });
  }
  const today = new Date();
  //.toISOString().split("T")[0];
  // print out (booking.startDate);
  // print out (today);
  if (today >= booking.startDate) {
    return res.status(403).json({
      message: "Bookings that have been started can't be deleted",
    });
  }
  await booking.destroy();

  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
