import React, { useState, useEffect } from "react";
import "../css/Stock.css";
function Stock() {
  const apiUri = "http://localhost:4000";
  // const initialData = [
  //   {
  //     _id: "652ba0e6e6fa136064f90dad",
  //     name: "Red chair",
  //     category: "chair",
  //     quantity: 20,
  //   },
  //   {
  //     _id: "652ba1cfe6fa136064f90dae",
  //     name: "White Chair",
  //     category: "chair",
  //     quantity: 20,
  //   },
  //   {
  //     _id: "652ba1dfe6fa136064f90daf",
  //     name: "White Table",
  //     category: "Table",
  //     quantity: 10,
  //   },
  //   {
  //     _id: "652ba90ae6fa136064f90db0",
  //     name: "round Table",
  //     category: "Table",
  //     quantity: 10,
  //   },
  //   {
  //     _id: "652ba94ae6fa136064f90db1",
  //     name: "round chair",
  //     category: "chair",
  //     quantity: 100,
  //   },
  // ];

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [selectedProductToDelete, setSelectedProductToDelete] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [curCompanyToggle, setCurCompanyToggle] = useState(true);
  const [curCompanyName, setCurCompanyName] = useState("S.A.N_FIBRE_&_Co");

  useEffect(() => {
    // Fetch initial data from the backend API
    fetch(`${apiUri}/${curCompanyName}/products`)
      .then((response) => response.json())
      .then((data) => {
        // Sort the data by category as before
        console.log(data);
        const sortedData = data.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        setData(sortedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [curCompanyName]);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleIncrement = (product) => {
  //   setData((prevData) =>
  //     prevData.map((item) =>
  //       item._id === product._id
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     )
  //   );
  // };

  // const handleDecrement = (product) => {
  //   if (product.quantity > 0) {
  //     setData((prevData) =>
  //       prevData.map((item) =>
  //         item._id === product._id
  //           ? { ...item, quantity: item.quantity - 1 }
  //           : item
  //       )
  //     );
  //   }
  // };

  const handleAddProduct = () => {
    if (newCategory && newProductName && newQuantity >= 0) {
      const newProductData = {
        name: newProductName,
        category: newCategory,
        quantity: newQuantity,
        company: curCompanyName,
      };

      fetch(`${apiUri}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      })
        .then((response) => response.json())
        .then((newProduct) => {
          // Update the state with the new product from the response
          setData((prevData) => [...prevData, newProduct]);
        })
        .catch((error) => console.error("Error adding a new product:", error));

      // Clear the input fields
      setNewCategory("");
      setNewProductName("");
      setNewQuantity(0);
    }
  };

  const handleDeleteProduct = () => {
    // Send a delete request to the backend to delete the product with the given ID
    fetch(`${apiUri}/products/${selectedProductToDelete}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If the delete request was successful, update the frontend data
          setData((prevData) =>
            prevData.filter((item) => item._id !== selectedProductToDelete)
          );
        } else {
          console.error("Error deleting product");
        }
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const handleInputChange = (product, value) => {
    setInputValues({
      ...inputValues,
      [product._id]: value,
    });
  };

  const handleAddQuantity = (productId) => {
    // Send a PUT (or PATCH) request to the backend to update the quantity of the product with the given ID
    const updatedQuantity = inputValues[productId];
    fetch(`${apiUri}/products/${productId}`, {
      method: "PUT", // Use PUT or PATCH depending on your API design
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: updatedQuantity }),
    })
      .then((response) => {
        if (response.ok) {
          // If the update request was successful, update the frontend data
          setData((prevData) =>
            prevData.map((item) =>
              item._id === productId
                ? { ...item, quantity: updatedQuantity }
                : item
            )
          );
        } else {
          console.error("Error updating product quantity");
        }
      })
      .catch((error) =>
        console.error("Error updating product quantity:", error)
      );
  };
  const handleCurCompanyToggle = (e) => {
    setCurCompanyName(e.target.innerText);
    setCurCompanyToggle(!curCompanyToggle);
  };
  return (
    <div className="stock">
      <h1>Stock Management</h1>
      <div className="toggle-buttons">
        <button
          className={curCompanyToggle ? "active" : ""}
          onClick={handleCurCompanyToggle}
        >
          S.A.N_FIBRE_&_Co
        </button>
        <button
          className={!curCompanyToggle ? "active" : ""}
          onClick={handleCurCompanyToggle}
        >
          SANIT_Windows
        </button>
      </div>
      <h2>{curCompanyName}</h2>
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
            {/* <th>Action</th> */}
            <th>Update Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              {/* <td>
                <button onClick={() => handleIncrement(item)}>+</button>
                <button onClick={() => handleDecrement(item)}>-</button>
              </td> */}
              <td>
                <input
                  type="number"
                  value={inputValues[item._id] || ""}
                  onChange={(e) => handleInputChange(item, e.target.value)}
                />
                <button onClick={() => handleAddQuantity(item._id)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stock;
