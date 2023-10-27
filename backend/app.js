const express = require("express");
const cors = require("cors");
const Product = require("./models/Product");
const Bill = require("./models/Bill");

const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

app.get("/:company/products", async (req, res) => {
  const company = req.params.company;

  try {
    const products = await Product.find({ company });
    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, category, quantity, company } = req.body; // Assuming you send these fields in the request body

    // Create a new product using the Product model
    const newProduct = new Product({ name, category, quantity, company });

    // Save the new product to the database
    await newProduct.save();

    // Return the newly created product in the response
    res.json(newProduct);
  } catch (error) {
    console.error("Error adding a new product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Use Mongoose to find and delete the product by its ID
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedQuantity = req.body.quantity;

    // Use Mongoose to find and update the product's quantity by its ID
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { quantity: updatedQuantity },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product quantity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Billing

app.post("/generateBill", async (req, res) => {
  try {
    const billData = req.body; // Assuming the data is sent in the request body

    // Create a new Bill instance using the Bill model
    const newBill = new Bill(billData);

    // Save the newBill to the MongoDB database
    await newBill.save();

    console.log("Bill saved successfully:", newBill);

    // Respond with a success message
    res.status(201).json({ message: "Bill generated and saved" });
  } catch (error) {
    console.error("Error generating and saving bill:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getBills/:company", async (req, res) => {
  const company = req.params.company;
  try {
    // Fetch all bills from the MongoDB database
    const bills = await Bill.find({ company }).sort({ date: -1 });

    // Respond with the fetched bills
    res.json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteBill/:id", async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/getBill/:billId", async (req, res) => {
  try {
    const billId = req.params.billId;
    const bill = await Bill.findById(billId);

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // If the bill is found, send it as a JSON response
    res.status(200).json(bill);
  } catch (error) {
    console.error("Error fetching bill:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
