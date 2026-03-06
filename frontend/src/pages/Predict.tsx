// src/pages/Predict.jsx
import { useState, useEffect } from "react";

function Predict() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Fraud Transactions Dashboard</h2>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hour</th>
            <th>Day</th>
            <th>Month</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Payment</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Occupation</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr
              key={tx.transaction_id}
              style={{
                backgroundColor: tx.prediction === "Fraud" ? "red" : "lightblue",
                color: "white"
              }}
            >
              <td>{tx.transaction_id}</td>
              <td>{tx.hour}</td>
              <td>{tx.day_of_week}</td>
              <td>{tx.month}</td>
              <td>{tx.transaction_amount}</td>
              <td>{tx.transaction_type}</td>
              <td>{tx.category}</td>
              <td>{tx.first_name}</td>
              <td>{tx.last_name}</td>
              <td>{tx.city}</td>
              <td>{tx.country}</td>
              <td>{tx.payment_method}</td>
              <td>{tx.age}</td>
              <td>{tx.gender}</td>
              <td>{tx.occupation}</td>
              <td>{tx.account_balance}</td>
              <td>{tx.transaction_status}</td>
              <td>{tx.prediction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Predict;