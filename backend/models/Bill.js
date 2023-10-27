const mongoose = require("../db.js");

const billSchema = new mongoose.Schema({
  serialNumber: String,
  customerName: String,
  date: Date,
  customerGST: String,
  products: [
    {
      category: String,
      name: String,
      price: Number,
      quantity: Number,
      subTotal: Number,
    },
  ],
  company: String,
  total: Number,
});

module.exports = mongoose.model("Bill", billSchema);
