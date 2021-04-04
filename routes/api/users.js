const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();

router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Enter a Valid Email").isEmail(),
    check(
      "password",
      "Enter password more than or equal to 6 Characters",
    ).isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("USERS ROUTE");
  },
);
module.exports = router;
