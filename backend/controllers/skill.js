const Skill = require("../models/Skill");

const getSkills = async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
};

const createSkill = async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json(skill);
};

const updateSkill = async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(skill);
};

const deleteSkill = async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Skill deleted" });
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
