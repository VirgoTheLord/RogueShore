const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const Product = require("../models/productModel");

const productAdminRouter = express.Router();
//GET /api/admin/products
// Get all products
// Private access, admin only
productAdminRouter.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = productAdminRouter;
