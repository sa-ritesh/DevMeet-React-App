const express = require("express");
const app = express();
//body-parser
app.use(express.json({ extended: false }));
const connectDB = require("./config/db");
const router = require("./routes/api/users");
const PORT = process.env.PORT || 5000;

const path = require("path");
// Connecting DB
connectDB();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization",
  );
  next();
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

//serve-static assets in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.solve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in Listening to Port");
    return;
  }
  console.log(`Successfully Listening to PORT: ${PORT}`);
});
