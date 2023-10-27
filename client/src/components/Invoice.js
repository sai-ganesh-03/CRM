import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/Invoice.css";

const Invoice = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState(null);
  const [accountNo, setAccountNo] = useState("");
  const [tagline, setTagline] = useState("");
  useEffect(() => {
    // Fetch the bill details from the server when the component mounts
    axios
      .get(`http://localhost:4000/getBill/${billId}`)
      .then((response) => {
        setBill(response.data);
        if (response.data.company === "S.A.N_FIBRE_&_Co") {
          setAccountNo("89270500000549");
          setTagline("Mfrs. of Fibre Doors, Fibre Sheet & Fibre Work");
        } else {
          setAccountNo("89270500000548");
          setTagline("Mfrs. of UPVC Windows & Door Solutions");
        }
      })
      .catch((error) => {
        console.error("Error fetching bill details:", error);
      });
  }, [billId]);
  function extractDate(str) {
    const date = new Date(str);
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );
  }
  function replaceUnderscoreWithSpace(str) {
    return str.replace(/_/g, " ");
  }
  return (
    <div className="invoice">
      {bill ? (
        <div>
          <div className="header">
            <h1>{replaceUnderscoreWithSpace(bill.company)} </h1>
            <p className="address">{tagline}</p>
            <p className="address">By Pass Road, Urgadur, Shivamogga-577 202</p>
          </div>
          <div className="billing-details">
            <h2>Billing Details</h2>
            <p>Bill No: {bill.serialNumber}</p>
            <p>Customer: {bill.customerName}</p>
            <p>Bill Date: {extractDate(bill.date)}</p>
            {bill.customerGST && <p>Customer GST: {bill.customerGST}</p>}
          </div>
          <div className="product-list">
            <h2>Products</h2>
            <table>
              <thead>
                <tr>
                  <th>HSN/SAC</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {bill.products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.category}</td>
                    <td>{product.name}</td>
                    <td>₹{product.price.toFixed(2)}</td>
                    <td>{product.quantity}</td>
                    <td>₹{product.subTotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bottom">
            <div className="bankDetails">
              <h4>Bank Details: </h4>
              <h4>Name: {replaceUnderscoreWithSpace(bill.company)} </h4>
              <h4>A/C No: {accountNo} </h4>
              <h4>Bank: Bank Of Baroda </h4>
              <h4>IFSC Code: BARB0VJSHSR</h4>
              <h4>Branch: S.R Road, Shivamogga</h4>
            </div>
            <div className="total">
              <h3>Total: ₹{bill.total.toFixed(2)}</h3>
              <h3>CGST: ₹{(parseFloat(bill.total) * 0.09).toFixed(2)}</h3>
              <h3>SGST: ₹{(parseFloat(bill.total) * 0.09).toFixed(2)}</h3>
              <h3>
                Grand Total: ₹
                {(
                  parseFloat(bill.total.toFixed(2)) +
                  parseFloat(bill.total.toFixed(2) * 0.09 * 2)
                ).toFixed(2)}
              </h3>
            </div>
          </div>
          <hr />
          <div className="footer">
            <div className="termsnconditions">
              <h4>TERMS & CONDITIONS: </h4>
              <ul>
                <li>Payment to be effected within 10 days unless agreed</li>
                <li>
                  Otherwise 21% interest will be charged after due date till the
                  actual date of payment
                </li>
                <li>Goods Once Sold Cannot be taken back or exchanged</li>
                <li>
                  Our Responsibilities ceases once the goods leave our factory
                </li>
                <li>Subject to Shimoga Jurisdiction only</li>
              </ul>
              <p>Customer Signature ..................................</p>
            </div>
            <div className="sign">
              <h3>For {replaceUnderscoreWithSpace(bill.company)}</h3>
              <p>Signature</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Invoice;
