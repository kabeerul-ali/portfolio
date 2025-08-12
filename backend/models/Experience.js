const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    description: String,
    technologies: [String],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date, // can be null for "Present"
    location: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Experience", experienceSchema);
