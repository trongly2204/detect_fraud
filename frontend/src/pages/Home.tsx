import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // popup text
  const [showPopup, setShowPopup] = useState(false); // show/hide popup
  const navigate = useNavigate();

  const checkPassword = async () => {
    try {
      //Adjust fetch that match with the http that run login page
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.status === 200) {
        setMessage("✅ Password correct!");
        setShowPopup(true);

        // Redirect after 1 second
        setTimeout(() => {
          setShowPopup(false);
          navigate("/predict");
        }, 1000);
      } else {
        setMessage("❌ Wrong password!");
        setShowPopup(true);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Backend not running!");
      setShowPopup(true);
    }
  };

  return (
    <div className="homepage">
      <h1>Fraud Detection System</h1>

      <input
        type="password"
        placeholder="Enter system password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={checkPassword}>Login</button>

      {/* Notification Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{message}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;