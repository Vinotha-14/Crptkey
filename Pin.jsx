import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Pin.css";

function Pin() {
  const [pin, setPin] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // 🔐 Shuffle keypad numbers
  const shuffleNumbers = () => {
    const nums = [...Array(10).keys()];
    const shuffled = nums.sort(() => Math.random() - 0.5);
    setNumbers(shuffled);
  };

  // Shuffle on first load
  useEffect(() => {
    shuffleNumbers();
  }, []);

  // Add number
  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      setPin((prev) => prev + num);
      shuffleNumbers(); // reshuffle after each digit
    }
  };

  // Clear all
  const handleClear = () => {
    setPin("");
    shuffleNumbers();
  };

  // Backspace
  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    shuffleNumbers();
  };

  // Verify PIN
  const handleVerifyPin = async () => {
    const userId = localStorage.getItem("userId");
    let attempts = parseInt(localStorage.getItem("pinAttempts")) || 0;

    if (!userId) {
      alert("User not logged in");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5002/api/transaction/verify-pin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            pin,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("pinAttempts", "0");
        alert("PIN Correct ✅");
        navigate("/dashboard");
      } else {
        attempts += 1;
        localStorage.setItem("pinAttempts", attempts.toString());

        setError(true);
        setTimeout(() => setError(false), 500);

        if (attempts >= 3) {
          alert("❌ 3 Failed Attempts. Card Blocked");
          localStorage.clear();
          navigate("/");
        } else {
          alert(`Wrong PIN ❌ Attempt ${attempts}/3`);
          setPin("");
          shuffleNumbers();
        }
      }
    } catch (error) {
      alert("Server error");
      setPin("");
      shuffleNumbers();
    }
  };

  // Auto verify when 4 digits entered
  useEffect(() => {
    if (pin.length === 4) {
      handleVerifyPin();
    }
  }, [pin]);

  return (
    <div className={`pin-container ${error ? "shake" : ""}`}>
      <h2>Enter Secure PIN</h2>

      <div className="pin-display">
        {"●".repeat(pin.length)}
      </div>

      <div className="keypad">
        {numbers.map((num) => (
          <button key={num} onClick={() => handleNumberClick(num)}>
            {num}
          </button>
        ))}

        <button className="clear-btn" onClick={handleClear}>
          C
        </button>

        <button className="back-btn" onClick={handleBackspace}>
          ⌫
        </button>
      </div>
    </div>
  );
}

export default Pin;