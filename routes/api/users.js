const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

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
  async (req, res) => {
    console.log(req.body);
    //body validation
    const { name, password, email, avatar } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email });
      //check if user already exists
      if (user) {
        return res.status(400).json({
          errors: [
            {
              message: "User Already Exists",
            },
          ],
        });
      }
      // for new user set gravatar

      const avatar = await gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        password,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      return res.send("User Registered!!");
    } catch (err) {
      res.send("ERROR");
    }
  },
);
module.exports = router;
