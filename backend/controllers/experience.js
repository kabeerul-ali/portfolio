const Experience = require("../models/Experience");

const getExperiences = async (req, res) => {
  const exp = await Experience.find().sort({ startDate: -1 });
  res.json(exp);
};

const createExperience = async (req, res) => {
  const exp = await Experience.create(req.body);
  res.status(201).json(exp);
};

const updateExperience = async (req, res) => {
  const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(exp);
};

const deleteExperience = async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({ message: "Experience deleted" });
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
