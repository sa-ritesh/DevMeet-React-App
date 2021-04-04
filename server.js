const express = require("express");
const app = express();
//body-parser
app.use(express.json({ extended: false }));
const connectDB = require("./config/db");
const router = require("./routes/api/users");
const PORT = process.env.PORT || 5000;
// Connecting DB
connectDB();
app.get("/", (req, res) => {
  return res.send("API RUNNING");
});
//Initialising Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in Listening to Port");
    return;
  }
  console.log(`Successfully Listening to PORT: ${PORT}`);
});
