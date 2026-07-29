const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "Tea",
    category: "Beverage",
    quantity: 50,
    unit: "packets",
    image: ""
  },
  {
    name: "Coffee",
    category: "Beverage",
    quantity: 40,
    unit: "packets",
    image: ""
  },
  {
    name: "Sugar",
    category: "Grocery",
    quantity: 25,
    unit: "kg",
    image: ""
  },
  {
    name: "Milk",
    category: "Dairy",
    quantity: 30,
    unit: "litres",
    image: ""
  },
  {
    name: "Biscuits",
    category: "Snacks",
    quantity: 60,
    unit: "packets",
    image: ""
  },
  {
    name: "Bread",
    category: "Bakery",
    quantity: 20,
    unit: "packets",
    image: ""
  },
  {
    name: "Paper Cups",
    category: "Disposable",
    quantity: 100,
    unit: "pieces",
    image: ""
  },
  {
    name: "Tissue Paper",
    category: "Disposable",
    quantity: 80,
    unit: "pieces",
    image: ""
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    console.log("Old products removed");

    await Product.insertMany(products);

    console.log("Products added successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.log("Seeding failed:", error.message);

    await mongoose.connection.close();
  }
}

seedProducts();