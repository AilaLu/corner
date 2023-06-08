// backend/routes/api/users.js
const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();

// Sign up
router.post("/", async (req, res) => {
  const { email, password, username } = req.body; //deconstruct the request body
  const hashedPassword = bcrypt.hashSync(password); //use bcrypt's hashSync function to hash the user's provided password to be saved as the user's hashedPassword in the database
  const user = await User.create({ email, username, hashedPassword }); //Create a new User

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

module.exports = router;
