const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("USERS ROUTE");
});
module.exports = router;
