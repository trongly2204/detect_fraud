// src/pages/Result.tsx
import { useEffect, useState } from "react";
import '../styles/Result.css';  // navigate from pages/ to styles/

function Result() {
  const [result, setResult] = useState<string>("Loading...");

  useEffect(() => {
    const transactionData = localStorage.getItem("transactionData");
    if (transactionData) {
      fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: transactionData
      })
        .then((res) => res.json())
        .then((data) => {
          setResult(data.fraud === 1 ? "Fraudulent Transaction 🚨" : "Transaction is Safe ✅");
        })
        .catch(() => setResult("Error fetching prediction"));
    }
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Prediction Result</h2>
      <p>{result}</p>
    </div>
  );
}

export default Result;
