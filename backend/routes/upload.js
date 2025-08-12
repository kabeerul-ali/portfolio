const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/upload");

const router = express.Router();

// Use memory storage for direct stream upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadImage);

module.exports = router;
