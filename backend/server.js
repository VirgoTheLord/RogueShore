const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const checkoutRouter = require("./routes/checkoutRoutes");
const orderRouter = require("./routes/orderRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const subscriberRouter = require("./routes/subscribeRoutes");
const adminRouter = require("./routes/adminRoutes");
const productAdminRouter = require("./routes/productAdminRoutes");
const orderAdminRouter = require("./routes/orderAdminRoutes");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to RogueShore API!");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api", subscriberRouter);

//admin routes
app.use("/api/admin/users", adminRouter);
app.use("/api/admin/products", productAdminRouter);
app.use("/api/admin/orders", orderAdminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;
