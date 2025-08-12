const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");

//const protect = require("../middleware/authMiddleware"); // admin only

// Public
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Admin only
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
