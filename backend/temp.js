require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User"); // adjust path if needed

const resetAndCreateAdmin = async () => {
  try {
    // Connect DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // ❌ Remove all users
    const deleteResult = await User.deleteMany({});
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} users`);

    // ✅ Insert admin user
    const adminUser = await User.create({
      email: "kabeerulali@gmail.com",
      password: "123",
      role: "admin",
    });

    console.log("✅ Admin user inserted successfully");
    console.log({
      id: adminUser._id,
      email: adminUser.email,
      role: adminUser.role,
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

resetAndCreateAdmin();
