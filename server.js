require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { User, Order, Product } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/interviewDB";

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find().populate("userId");
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
