import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Billing.css";

const Billing = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerGST, setCustomerGST] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([
    { category: "", name: "", price: 0, quantity: 0, subTotal: 0 },
  ]);
  const [curCompanyToggle, setCurCompanyToggle] = useState(true);
  const [curCompanyName, setCurCompanyName] = useState("S.A.N_FIBRE_&_Co");

  const handleAddProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { category: "", name: "", price: 0, quantity: 0, subTotal: 0 },
    ]);
  };

  const handleProductChange = (index, field, value) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      if (field === "quantity") {
        updatedProducts[index].quantity = parseInt(value, 10);
        updatedProducts[index].subTotal =
          updatedProducts[index].quantity * updatedProducts[index].price;
      } else if (field === "name") {
        updatedProducts[index].name = value;
      } else if (field === "category") {
        updatedProducts[index].category = value;
      } else if (field === "price") {
        updatedProducts[index].price = parseFloat(value);
        updatedProducts[index].subTotal =
          updatedProducts[index].quantity * updatedProducts[index].price;
      }
      return updatedProducts;
    });
  };

  const handleSerialNumberChange = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };
  const handleCustomerGSTChange = (e) => {
    setCustomerGST(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.subTotal, 0);
  };

  const generateBill = async () => {
    const billData = {
      serialNumber,
      customerName,
      date,
      customerGST,
      products,
      company: curCompanyName,
      total: calculateTotal(),
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/generateBill",
        billData
      );
      console.log("Bill generated successfully:", response.data);
      // Clear the inputs and reset the products to an initial state
      // setSerialNumber("");
      // setCustomerName("");
      // setDate("");
      // setProducts([
      //   { category: "", name: "", price: 0, quantity: 0, subTotal: 0 },
      // ]);
      alert("Bill generated");
      window.location.reload();
    } catch (error) {
      console.error("Error generating bill:", error);
      alert("Failed");
    }
  };

  const handleCurCompanyToggle = (e) => {
    setCurCompanyName(e.target.innerText);
    setCurCompanyToggle(!curCompanyToggle);
  };
  return (
    <div className="billing">
      <div className="billHeader">
        <h1>Generate Bill</h1>
        <Link to="/billing/list">All Bills</Link>
      </div>
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
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Customer GST</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Serial Number"
                onChange={handleSerialNumberChange}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Customer Name"
                onChange={handleCustomerNameChange}
              />
            </td>
            <td>
              <input type="date" onChange={handleDateChange} />
            </td>
            <td>
              <input
                type="text"
                placeholder="Customer GST"
                onChange={handleCustomerGSTChange}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>HSN/SAC</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  placeholder="Category"
                  onChange={(e) =>
                    handleProductChange(index, "category", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Product Name"
                  onChange={(e) =>
                    handleProductChange(index, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Price"
                  onChange={(e) =>
                    handleProductChange(index, "price", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Quantity"
                  onChange={(e) =>
                    handleProductChange(index, "quantity", e.target.value)
                  }
                />
              </td>
              <td>₹{product.subTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-product">
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="total">
        <h2>Total: ₹{calculateTotal().toFixed(2)}</h2>
      </div>

      <div className="generate-bill">
        <button onClick={generateBill}>Generate Bill</button>
      </div>
    </div>
  );
};

export default Billing;
