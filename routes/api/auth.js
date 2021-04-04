const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

router.get("/", auth, (req, res) => {
  res.send("AUTH ROUTE");
});
module.exports = router;
