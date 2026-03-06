const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// ====== 1️⃣ MySQL Connection ======
const db = mysql.createConnection({
  host: "localhost",     // your DB host
  user: "root",          // your DB user
  password: "Thuyanh2204",          // your DB password
  database: "fraud"   // your DB name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// ====== 2️⃣ GET all transactions with predictions ======
const axios = require("axios");

app.get("/api/transactions", async (req, res) => {

  const query = `
    SELECT 
      t.transaction_id,
      t.hour,
      t.day_of_week,
      t.month,
      t.transaction_amount,
      t.transaction_type,
      t.category,
      t.transaction_status,

      c.first_name,
      c.last_name,
      c.age,
      c.gender,
      c.occupation,
      c.account_balance,

      l.city,
      l.country,

      p.method_name AS payment_method

    FROM transactions t
    JOIN customers c ON t.customer_id = c.customer_id
    JOIN locations l ON t.location_id = l.location_id
    JOIN payment_methods p ON t.payment_method_id = p.payment_method_id
  `;

  db.query(query, async (err, results) => {
    if (err) return res.status(500).json({ error: err });

    try {
      const predictions = await Promise.all(
        results.map(async (r) => {

          const mlResponse = await axios.post(
            "http://localhost:8000/predict",
            [{
              hour: r.hour,
              day_of_week: r.day_of_week,
              month: r.month,
              Transaction_Amount: r.transaction_amount,
              Transaction_Type: r.transaction_type,
              Category: r.category,
              City: r.city,
              Country: r.country,
              Payment_Method: r.payment_method,
              Customer_Age: r.age,
              Customer_Gender: r.gender,
              Customer_Occupation: r.occupation,
              Account_Balance: r.account_balance,
              Transaction_Status: r.transaction_status
            }]
          );

          return {
            ...r,
            prediction:
              mlResponse.data.prediction === 1 ? "Fraud" : "Normal"
          };
        })
      );

      res.json(predictions);

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "ML Server Error" });
    }
  });

});

// ====== 3️⃣ Start Server ======
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});