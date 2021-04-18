const mongoose = require("mongoose");
const db =
  "mongodb+srv://ritesh:myfootrr@devmeet.1jysw.mongodb.net/DevMeet?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useUnifiedTopology: true });
    console.log("Successfully Connected to DB");
  } catch (err) {
    console.log("ERROR IN CONNECTING TO DB", err.message);
    return;
  }
};
module.exports = connectDB;
