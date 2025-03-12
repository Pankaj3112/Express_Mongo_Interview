const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, unique: true },
});
const User = mongoose.model("User", userSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  total: Number,
});
const Order = mongoose.model("Order", orderSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  purchases: Number,
});
const Product = mongoose.model("Product", productSchema);

module.exports = { User, Order, Product };
