const express = require("express");
const router = express.Router();

const { EntreeType } = require("../db/models");

router.get("/", async (req, res) => {
  const where = {};
  let { isVegetarian } = req.query;
  if (isVegetarian === "true") where.isVegetarian = true;
  else if (isVegetarian === "false") where.isVegetarian = false;
  else if (
    isVegetarian &&
    isVegetarian !== "true" &&
    isVegetarian !== "false"
  ) {
    res.status(400);
    return res.json({
      errors: [{ message: "isVegetarian should be either true or false" }],
    });
  }
  const entreeTypes = await EntreeType.findAll({
    where,
  });

  return res.json(entreeTypes);
});

module.exports = router;
