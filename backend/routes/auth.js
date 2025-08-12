// routes/auth.js
const express = require("express");
const router = express.Router();
const { loginUser, logoutUser, getMe } = require("../controllers/auth");
const protect = require("../middleware/auth");

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);

module.exports = router;
