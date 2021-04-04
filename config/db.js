const mongoose = require("mongoose");
const config = require("Config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Successfully Connected to DB");
  } catch (err) {
    console.log("ERROR IN CONNECTING TO DB", err.message);
    return;
  }
};
module.exports = connectDB;
