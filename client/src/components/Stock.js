import React, { useState } from "react";
import "../css/Stock.css";

function Stock() {
  const initialData = [
    {
      _id: "652ba0e6e6fa136064f90dad",
      name: "Red chair",
      category: "chair",
      quantity: 20,
    },
    {
      _id: "652ba1cfe6fa136064f90dae",
      name: "White Chair",
      category: "chair",
      quantity: 20,
    },
    {
      _id: "652ba1dfe6fa136064f90daf",
      name: "White Table",
      category: "Table",
      quantity: 10,
    },
    {
      _id: "652ba90ae6fa136064f90db0",
      name: "round Table",
      category: "Table",
      quantity: 10,
    },
    {
      _id: "652ba94ae6fa136064f90db1",
      name: "round chair",
      category: "chair",
      quantity: 100,
    },
  ];
  const sortedData = initialData.sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  const [data, setData] = useState(sortedData);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [selectedProductToDelete, setSelectedProductToDelete] = useState("");
  const [inputValues, setInputValues] = useState({});

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIncrement = (product) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrement = (product) => {
    if (product.quantity > 0) {
      setData((prevData) =>
        prevData.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleAddProduct = () => {
    if (newCategory && newProductName && newQuantity >= 0) {
      const newProductData = {
        _id: Date.now().toString(),
        name: newProductName,
        category: newCategory,
        quantity: newQuantity,
      };
      setData((prevData) => [...prevData, newProductData]);
      setNewProductName("");
      setNewQuantity(0);
    }
  };

  const handleDeleteProduct = () => {
    if (selectedProductToDelete) {
      setData((prevData) =>
        prevData.filter((item) => item._id !== selectedProductToDelete)
      );
      setSelectedProductToDelete("");
    }
  };

  const handleInputChange = (product, value) => {
    setInputValues({
      ...inputValues,
      [product._id]: value,
    });
  };

  const handleAddQuantity = (product) => {
    const inputValue = parseInt(inputValues[product._id]);

    if (!isNaN(inputValue) && inputValue >= 0) {
      setData((prevData) =>
        prevData.map((item) =>
          item._id === product._id ? { ...item, quantity: inputValue } : item
        )
      );
    }

    // Clear the input value after updating
    setInputValues({
      ...inputValues,
      [product._id]: "",
    });
  };

  return (
    <div className="stock">
      <h1>Stock Management</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="add-product">
        <input
          type="text"
          placeholder="Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Product"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newQuantity}
          onChange={(e) => setNewQuantity(parseInt(e.target.value))}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="delete-product">
        <input
          list="productToDelete"
          value={selectedProductToDelete}
          onChange={(e) => setSelectedProductToDelete(e.target.value)}
          placeholder="Enter Product Name"
        />
        <datalist id="productToDelete">
          <option value="">Select Product to Delete</option>
          {data.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </datalist>
        <button onClick={handleDeleteProduct}>Delete Product</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Action</th>
            <th>Update Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleIncrement(item)}>+</button>
                <button onClick={() => handleDecrement(item)}>-</button>
              </td>
              <td>
                <input
                  type="number"
                  value={inputValues[item._id] || ""}
                  onChange={(e) => handleInputChange(item, e.target.value)}
                />
                <button onClick={() => handleAddQuantity(item)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stock;
