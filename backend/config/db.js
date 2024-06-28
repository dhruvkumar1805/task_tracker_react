const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const timestamp = new Date().toISOString();
    console.info(`[${timestamp}] Connecting to MongoDB...`);
    await mongoose.connect(process.env.MONGO_URI);
    console.info(`[${timestamp}] MongoDB Connected`);
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error connecting to MongoDB:`,
      error.message
    );
    process.exit(1);
  }
};

module.exports = connectDB;
