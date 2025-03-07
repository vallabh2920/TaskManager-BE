const express = require("express");

const { signup, login, verifyToken } = require("../controllers/authController");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  signup
);
router.post("/login", login);
router.get("/validate-token", verifyToken, (req, res) => {
  res.json({ message: "This is valid token", valid: true, user: req.user });
});

module.exports = router;
