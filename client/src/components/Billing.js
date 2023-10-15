import React, { useState } from "react";
import "../css/Billing.css"; // Make sure to import the associated CSS file

function Billing() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAddToCart = () => {
    if (customerName && productName && quantity > 0 && productPrice > 0) {
      const product = {
        customer: customerName,
        name: productName,
        quantity: quantity,
        price: productPrice,
        subtotal: quantity * productPrice,
      };
      setCart([...cart, product]);
      setCustomerName("");
      setProductName("");
      setQuantity("");
      setProductPrice("");
      // Recalculate the total price
      calculateTotalPrice([...cart, product]);
    }
  };

  const calculateTotalPrice = (cart) => {
    const total = cart.reduce((acc, product) => acc + product.subtotal, 0);
    setTotalPrice(total);
  };

  return (
    <div className="billing">
      <h1>Billing System</h1>
      <div className="add-product">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(parseFloat(e.target.value) || 0)}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.customer}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price.toFixed(2)}</td>
              <td>₹{item.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total">
        <strong>Total Price:</strong>₹{totalPrice.toFixed(2)}
      </div>
    </div>
  );
}

export default Billing;
