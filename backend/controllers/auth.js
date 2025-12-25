// controllers/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const cookieOptions = {
  httpOnly: true,
  secure: true,          // 🔥 Render + Netlify => ALWAYS true
  sameSite: "none",      // 🔥 CROSS-SITE COOKIE FIX
  maxAge: 7 * 24 * 60 * 60 * 1000,
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken({ id: user._id });
    res.cookie("token", token, cookieOptions);
    res
      .status(200)
      .json({ user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Logged out" });
};

const getMe = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });
    res.json({ user: req.user });
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser, logoutUser, getMe };
