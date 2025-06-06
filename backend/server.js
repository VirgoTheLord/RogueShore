const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
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

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
