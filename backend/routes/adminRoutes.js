const express = require("express");
const User = require("../models/userModel");
const { protect, admin } = require("../middleware/authMiddleware");

const adminRouter = express.Router();

//GET /api/admin/users
// Get all users
// Private access, admin only
adminRouter.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//POST /api/admin/users
//add a new user
// Private access, admin only
adminRouter.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role: role || "customer", // default to customer if no role provided
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//PUT /api/admin/users/:id
// Update user info by ID like name email or role
//access: Private, admin only
adminRouter.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }
    const updatedUser = await user.save();
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//DELETE /api/admin/users/:id
// Delete user by ID
//access: Private, admin only
adminRouter.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = adminRouter;
