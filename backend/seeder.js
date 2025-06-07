const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const products = require("./data/products");

dotenv.config();

//connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

//FN TO SEED DATA

const seedData = async () => {
  try {
    //clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    //assign default userid to all products
    const userId = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userId };
    });

    //insert products into db
    await Product.insertMany(sampleProducts);
    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
