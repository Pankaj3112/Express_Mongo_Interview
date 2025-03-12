const mongoose = require("mongoose");
require("dotenv").config();
const { User, Order, Product } = require("./models");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/interviewDB";

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
  try {
    // Clear existing data
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    console.log("Database cleared");

    // Create users with various ages for age range queries
    const users = await User.insertMany([
      {
        name: "Alice Johnson",
        age: 30,
        email: "alice@example.com",
        address: {
          street: "123 Main St",
          city: "Boston",
          state: "MA",
          zip: "02108",
        },
        role: "regular",
      },
      {
        name: "Bob Smith",
        age: 26,
        email: "bob@example.com",
        address: {
          street: "456 Oak Ave",
          city: "New York",
          state: "NY",
          zip: "10001",
        },
        role: "premium",
      },
      {
        name: "Charlie Brown",
        age: 33,
        email: "charlie@example.com",
        address: {
          street: "789 Pine Rd",
          city: "Chicago",
          state: "IL",
          zip: "60601",
        },
        role: "regular",
      },
      {
        name: "Diana Clark",
        age: 24,
        email: "diana@example.com",
        address: {
          street: "101 Cedar Ln",
          city: "Seattle",
          state: "WA",
          zip: "98101",
        },
        role: "premium",
      },
      {
        name: "Edward Lewis",
        age: 35,
        email: "edward@example.com",
        address: {
          street: "202 Elm St",
          city: "San Francisco",
          state: "CA",
          zip: "94102",
        },
        role: "regular",
      },
      {
        name: "Fiona White",
        age: 28,
        email: "fiona@example.com",
        address: {
          street: "303 Birch Blvd",
          city: "Austin",
          state: "TX",
          zip: "78701",
        },
        role: "premium",
      },
      {
        name: "George Lee",
        age: 22,
        email: "george@example.com",
        address: {
          street: "404 Maple Dr",
          city: "Denver",
          state: "CO",
          zip: "80202",
        },
        role: "regular",
      },
      {
        name: "Hannah Garcia",
        age: 40,
        email: "hannah@example.com",
        address: {
          street: "505 Willow Way",
          city: "Portland",
          state: "OR",
          zip: "97201",
        },
        role: "admin",
      },
      {
        name: "Ian Taylor",
        age: 31,
        email: "ian@example.com",
        address: {
          street: "606 Aspen Ave",
          city: "Miami",
          state: "FL",
          zip: "33101",
        },
        role: "regular",
      },
      {
        name: "Julia Miller",
        age: 29,
        email: "julia@example.com",
        address: {
          street: "707 Spruce St",
          city: "Nashville",
          state: "TN",
          zip: "37201",
        },
        role: "premium",
      },
    ]);
    console.log("Users created");

    // Create products with different purchase counts for most purchased product query
    const products = await Product.insertMany([
      {
        name: "Laptop",
        description: "High-performance laptop",
        price: 1200,
        category: "Electronics",
        purchases: 45,
      },
      {
        name: "Smartphone",
        description: "Latest model",
        price: 800,
        category: "Electronics",
        purchases: 65,
      },
      {
        name: "Headphones",
        description: "Noise-cancelling",
        price: 200,
        category: "Electronics",
        purchases: 50,
      },
      {
        name: "Desk Chair",
        description: "Ergonomic office chair",
        price: 300,
        category: "Furniture",
        purchases: 25,
      },
      {
        name: "Coffee Table",
        description: "Modern design",
        price: 250,
        category: "Furniture",
        purchases: 15,
      },
      {
        name: "Running Shoes",
        description: "Athletic footwear",
        price: 120,
        category: "Clothing",
        purchases: 55,
      },
      {
        name: "Winter Jacket",
        description: "Waterproof and warm",
        price: 180,
        category: "Clothing",
        purchases: 35,
      },
      {
        name: "Blender",
        description: "Professional-grade",
        price: 150,
        category: "Kitchen",
        purchases: 30,
      },
      {
        name: "Coffee Maker",
        description: "Automatic brewing",
        price: 90,
        category: "Kitchen",
        purchases: 65,
      },
      {
        name: "Fitness Watch",
        description: "Heart rate monitoring",
        price: 220,
        category: "Electronics",
        purchases: 40,
      },
    ]);
    console.log("Products created");

    // Create orders with references to users and products
    const orders = [];

    // Alice has 3 orders
    orders.push(
      {
        userId: users[0]._id,
        products: [
          { productId: products[0]._id, quantity: 1, price: products[0].price },
          { productId: products[2]._id, quantity: 1, price: products[2].price },
        ],
        total: products[0].price + products[2].price,
        status: "delivered",
        orderDate: new Date("2023-11-01"),
      },
      {
        userId: users[0]._id,
        products: [
          { productId: products[5]._id, quantity: 1, price: products[5].price },
        ],
        total: products[5].price,
        status: "delivered",
        orderDate: new Date("2023-12-05"),
      },
      {
        userId: users[0]._id,
        products: [
          { productId: products[8]._id, quantity: 1, price: products[8].price },
        ],
        total: products[8].price,
        status: "processing",
        orderDate: new Date("2024-01-10"),
      }
    );

    // Bob has 2 orders
    orders.push(
      {
        userId: users[1]._id,
        products: [
          { productId: products[1]._id, quantity: 1, price: products[1].price },
        ],
        total: products[1].price,
        status: "delivered",
        orderDate: new Date("2023-10-20"),
      },
      {
        userId: users[1]._id,
        products: [
          { productId: products[6]._id, quantity: 1, price: products[6].price },
          { productId: products[9]._id, quantity: 1, price: products[9].price },
        ],
        total: products[6].price + products[9].price,
        status: "shipped",
        orderDate: new Date("2023-12-15"),
      }
    );

    // Charlie has 4 orders
    orders.push(
      {
        userId: users[2]._id,
        products: [
          { productId: products[3]._id, quantity: 1, price: products[3].price },
        ],
        total: products[3].price,
        status: "delivered",
        orderDate: new Date("2023-09-10"),
      },
      {
        userId: users[2]._id,
        products: [
          { productId: products[8]._id, quantity: 1, price: products[8].price },
        ],
        total: products[8].price,
        status: "delivered",
        orderDate: new Date("2023-10-25"),
      },
      {
        userId: users[2]._id,
        products: [
          { productId: products[1]._id, quantity: 1, price: products[1].price },
        ],
        total: products[1].price,
        status: "delivered",
        orderDate: new Date("2023-11-30"),
      },
      {
        userId: users[2]._id,
        products: [
          { productId: products[7]._id, quantity: 1, price: products[7].price },
        ],
        total: products[7].price,
        status: "pending",
        orderDate: new Date("2024-01-15"),
      }
    );

    // Diana has 2 orders
    orders.push(
      {
        userId: users[3]._id,
        products: [
          { productId: products[4]._id, quantity: 1, price: products[4].price },
          { productId: products[7]._id, quantity: 1, price: products[7].price },
        ],
        total: products[4].price + products[7].price,
        status: "delivered",
        orderDate: new Date("2023-11-05"),
      },
      {
        userId: users[3]._id,
        products: [
          { productId: products[9]._id, quantity: 1, price: products[9].price },
        ],
        total: products[9].price,
        status: "shipped",
        orderDate: new Date("2024-01-02"),
      }
    );

    // Edward has 1 order
    orders.push({
      userId: users[4]._id,
      products: [
        {
          productId: products[2]._id,
          quantity: 2,
          price: products[2].price * 2,
        },
      ],
      total: products[2].price * 2,
      status: "delivered",
      orderDate: new Date("2023-12-20"),
    });

    // Fiona has 3 orders
    orders.push(
      {
        userId: users[5]._id,
        products: [
          { productId: products[0]._id, quantity: 1, price: products[0].price },
        ],
        total: products[0].price,
        status: "delivered",
        orderDate: new Date("2023-10-15"),
      },
      {
        userId: users[5]._id,
        products: [
          { productId: products[5]._id, quantity: 1, price: products[5].price },
        ],
        total: products[5].price,
        status: "delivered",
        orderDate: new Date("2023-11-20"),
      },
      {
        userId: users[5]._id,
        products: [
          { productId: products[8]._id, quantity: 1, price: products[8].price },
          { productId: products[9]._id, quantity: 1, price: products[9].price },
        ],
        total: products[8].price + products[9].price,
        status: "processing",
        orderDate: new Date("2024-01-05"),
      }
    );

    // Create all the orders
    await Order.insertMany(orders);
    console.log("Orders created");

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

connectDB().then(seedDB);
