const express = require("express");
const router = express.Router();
const {
  submitMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} = require("../controllers/contact");
const protect = require("../middleware/auth");

// Public
router.post("/", submitMessage);

// Admin
router.get("/", protect, getMessages);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;
