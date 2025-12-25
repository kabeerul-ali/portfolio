const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

// ========== Middleware ==========
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// CORS
app.use(
  cors({
    origin: "https://kabeerul-ali-portfolio.netlify.app", // 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// 🔥 THIS LINE IS VERY IMPORTANT
app.options("*", cors());

// Serve static images if needed
app.use("/uploads", express.static("uploads"));

// ========== Routes ==========
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const projectRoutes = require("./routes/project");
const skillRoutes = require("./routes/skill");
const experienceRoutes = require("./routes/experience");
const contactRoutes = require("./routes/contact");
const cloudinaryRoutes = require("./routes/upload");

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cloudinary", cloudinaryRoutes); // ✅ Added new Cloudinary route

// ========== Global Error Handler ==========
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Something went wrong!" });
});

// ========== DB Connection & Start Server ==========
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
