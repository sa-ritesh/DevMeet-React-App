const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
connectDB();
app.get("/", (req, res) => {
  return res.send("API RUNNING");
});
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in Listening to Port");
    return;
  }
  console.log(`Successfully Listening to PORT: ${PORT}`);
});
