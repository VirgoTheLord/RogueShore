const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
    }
    user = new User({ name, email, password });
    await user.save();

    //create JWT token
    const payload = { user: { id: user._id, role: user.role } };

    //sign and return the token with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//login post /api/users/login

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //find user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Wrong Password" });

    //create JWT token
    const payload = { user: { id: user._id, role: user.role } };

    //sign and return the token with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//get /api/users/profile
userRouter.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = userRouter;
