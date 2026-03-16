import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Card number must be 16 digits");
      return;
    }
    if (!/^\d{4}$/.test(pin)) {
      alert("PIN must be 4 digits");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5002/api/auth/register", {
        username,
        password,
        cardNumber,
        pin,
      });
      if (res.data.success) {
        alert("Registration successful! Login now.");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/>
      <input placeholder="Card Number (16 digits)" onChange={e => setCardNumber(e.target.value)} /><br/>
      <input type="password" placeholder="PIN (4 digits)" onChange={e => setPin(e.target.value)} /><br/>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}