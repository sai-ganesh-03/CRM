const mongoose = require("../db.js");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
