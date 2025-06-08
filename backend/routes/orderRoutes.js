const express = require("express");
const Order = require("../models/orderModel");
const { protect, admin } = require("../middleware/authMiddleware");

const orderRouter = express.Router();

// GET /api/orders/my-orders
// get logged-in user's orders
//access: private

orderRouter.get("/my-orders", protect, async (req, res) => {
  try {
    //find orders for authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); //sort by most recent orders
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/orders/:id
//get order details by id
// access: private

orderRouter.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    //return the full order details
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = orderRouter;
