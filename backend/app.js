const express = require("express");
const cors = require("cors");
const Product = require("./models/Product");

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
