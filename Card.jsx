import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function Card() {
  const [cardNumber, setCardNumber] = useState("");
  const navigate = useNavigate();

  // Add number (limit 16 digits)
  const handleNumberClick = (num) => {
    if (cardNumber.length < 16) {
      setCardNumber((prev) => prev + num);
    }
  };

  // Clear all
  const handleClear = () => {
    setCardNumber("");
  };

  // Backspace
  const handleBackspace = () => {
    setCardNumber((prev) => prev.slice(0, -1));
  };

  // Validate and verify with backend
  const handleNext = async () => {
    const cardRegex = /^[0-9]{16}$/;

    if (!cardRegex.test(cardNumber)) {
      alert("Card number must be exactly 16 digits");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5002/api/transaction/verify-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          cardNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store card number and reset pin attempts
        localStorage.setItem("cardNumber", cardNumber);
        localStorage.setItem("pinAttempts", "0");

        alert("Card verified successfully");
        navigate("/pin");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="card-container">
      <h2>Enter Card Number</h2>

      <div className="display">
        {cardNumber || "---- ---- ---- ----"}
      </div>

      <div className="keypad">
        {[1,2,3,4,5,6,7,8,9].map((num) => (
          <button key={num} onClick={() => handleNumberClick(num)}>
            {num}
          </button>
        ))}

        <button onClick={handleClear}>C</button>
        <button onClick={() => handleNumberClick(0)}>0</button>
        <button onClick={handleBackspace}>⌫</button>
      </div>

      <button className="next-btn" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default Card;