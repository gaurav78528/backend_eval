const express = require("express");
const { UserModel } = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.send({ msg: "Something Went Wrong!!", error: err });
      } else {
        const isAlreadyRegistered = await UserModel.find({ email });
        if (isAlreadyRegistered.length > 0) {
          res.send({ msg: "user already exits. Please Login." });
        } else {
          const user = new UserModel({
            name,
            email,
            gender,
            password: hash,
            age,
            city,
          });
          await user.save();
          res.send("User Registered Successfully");
        }
      }
    });
  } catch (error) {
    res.send({
      msg: "failed to register user.",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        // result == true
        if (err) {
          res.send({ msg: "Something Went Wrong.", error: err });
        } else {
          const token = jwt.sign({ email: email }, "masai");
          res.send({ msg: "User Logged In Successfully.", token: token });
        }
      });
    } else {
      res.send({ msg: "Wrong Credentials." });
    }
  } catch (error) {}
});
module.exports = { userRouter };
