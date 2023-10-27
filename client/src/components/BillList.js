import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductDetailsModal from "./ProductDetailsModal";
import { useNavigate } from "react-router-dom";

import "../css/BillList.css";

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [filteredBills, setFilteredBills] = useState([]);
  const [curCompanyToggle, setCurCompanyToggle] = useState(true);
  const [curCompanyName, setCurCompanyName] = useState("S.A.N_FIBRE_&_Co");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch all bills from the server when the component mounts
    axios
      .get(`http://localhost:4000/getBills/${curCompanyName}`)
      .then((response) => {
        setBills(response.data);
        setFilteredBills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
      });
  }, [curCompanyName]);

  function extractDate(str) {
    const date = new Date(str);
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );
  }

  const handleCurCompanyToggle = (e) => {
    setCurCompanyName(e.target.innerText);
    setCurCompanyToggle(!curCompanyToggle);
  };

  const handlePrintInvoice = (bill) => {
    navigate(`/invoice/${bill._id}`);
  };

  const handleBillClick = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteBill = (bill) => {
    // Send a delete request to the backend to delete the bill
    axios
      .delete(`http://localhost:4000/deleteBill/${bill._id}`)
      .then((response) => {
        // Remove the deleted bill from the local state
        setBills(bills.filter((b) => b._id !== bill._id));
      })
      .catch((error) => {
        console.error("Error deleting bill:", error);
      });
  };
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Filter bills based on the query
    const filtered = bills.filter(
      (bill) =>
        bill.customerName.toLowerCase().includes(query.toLowerCase()) ||
        bill.serialNumber.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBills(filtered);
  };
  return (
    <div className="bill-list">
      <h1>Bill List</h1>
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
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Company</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills.map((bill) => (
            <tr key={bill._id} onClick={() => handleBillClick(bill)}>
              <td>{bill.serialNumber}</td>
              <td>{bill.customerName}</td>
              <td>{extractDate(bill.date)}</td>
              <td>{bill.company}</td>
              <td>₹{bill.total}</td>
              <td>
                <button onClick={() => handleDeleteBill(bill)}>Delete</button>
                <button onClick={() => handlePrintInvoice(bill)}>
                  Print Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ProductDetailsModal bill={selectedBill} onClose={closeModal} />
      )}
    </div>
  );
};

export default BillList;
