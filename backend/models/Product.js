const mongoose = require("../db.js");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  company: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
