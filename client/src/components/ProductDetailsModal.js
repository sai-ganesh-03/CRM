import React from "react";
import "../css/ProductDetailsModal.css";
const ProductDetailsModal = ({ bill, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Product Details</h3>

        <table>
          <thead>
            <tr>
              <th>HSN/SAC</th>
              <th>Product Name</th>
              <th>Price/Piece</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {bill.products.map((product, index) => (
              <tr key={index}>
                <td>{product.category}</td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.subTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
