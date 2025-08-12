// routes/project.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/project");

// Public
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin (protected)
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
