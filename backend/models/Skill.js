const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String, // "Frontend", "Backend", "Database", etc.
      required: true,
    },
    level: {
      type: String, // "Beginner", "Intermediate", "Expert"
      default: "Intermediate",
    },
    icon: String, // Optional icon class or URL
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", skillSchema);
