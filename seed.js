const mongoose = require("mongoose");
require("dotenv").config();
const { User, Order, Product } = require("./models");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/interviewDB";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedDB = async () => {
  await User.deleteMany();
  await Order.deleteMany();
  await Product.deleteMany();

  const users = await User.insertMany([
    { name: "Alice", age: 30, email: "alice@example.com" },
    { name: "Bob", age: 26, email: "bob@example.com" },
  ]);

  await Order.insertMany([
    { userId: users[0]._id, total: 100 },
    { userId: users[1]._id, total: 200 },
  ]);

  await Product.insertMany([
    { name: "Laptop", price: 1000, purchases: 10 },
    { name: "Phone", price: 500, purchases: 20 },
  ]);

  console.log("Database seeded successfully!");
  mongoose.connection.close();
};

connectDB().then(seedDB);
