const Contact = require("../models/Contact");

const submitMessage = async (req, res) => {
  const message = await Contact.create(req.body);
  res.status(201).json(message);
};

const getMessages = async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
};

const markAsRead = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  res.json(updated);
};

const deleteMessage = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Message deleted" });
};

module.exports = {
  submitMessage,
  getMessages,
  markAsRead,
  deleteMessage,
};
