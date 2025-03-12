const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, min: 18, max: 100 },
  email: { type: String, required: true, unique: true, trim: true },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  role: { type: String, enum: ['regular', 'premium', 'admin'], default: 'regular' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for email and age queries
userSchema.index({ email: 1 });
userSchema.index({ age: 1 });

const User = mongoose.model("User", userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  category: { type: String, index: true },
  inStock: { type: Boolean, default: true },
  purchases: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Index for most purchased products
productSchema.index({ purchases: -1 });

const Product = mongoose.model("Product", productSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderDate: { type: Date, default: Date.now }
});

// Index for user order lookups
orderSchema.index({ userId: 1 });

const Order = mongoose.model("Order", orderSchema);

module.exports = { User, Order, Product };