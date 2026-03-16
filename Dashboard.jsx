import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jsPDF } from "jspdf";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();
  const [showStatement, setShowStatement] = useState(false);

  const username = localStorage.getItem("username");
  const cardNumber = localStorage.getItem("cardNumber");

  const maskedCard = cardNumber
    ? "******" + cardNumber.slice(-3)
    : "******";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const today = new Date();
  const date = today.toLocaleDateString();
  const time = today.toLocaleTimeString();

  // 📄 DOWNLOAD MINI STATEMENT PDF
  const downloadStatement = () => {

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("CRYPTKEY BANK", 70, 20);

    doc.setFontSize(12);
    doc.text("Mini Statement", 85, 30);

    doc.line(20, 35, 190, 35);

    doc.text(`User Name : ${username}`, 20, 50);
    doc.text(`Card Number : ${maskedCard}`, 20, 60);
    doc.text(`Date : ${date}`, 20, 70);
    doc.text(`Time : ${time}`, 20, 80);

    doc.line(20, 90, 190, 90);

    doc.text("Security Details", 20, 105);

    doc.text("PIN Entry Method : Dynamic Keypad", 20, 115);
    doc.text("Card Verification : Successful", 20, 125);
    doc.text("PIN Verification : Successful", 20, 135);
    doc.text("Session Status : Secure Login", 20, 145);

    doc.line(20, 155, 190, 155);

    doc.text("Thank You For Using CryptKey ATM", 55, 170);

    doc.save("Mini_Statement.pdf");
  };

  return (
    <div className="dashboard-container">

      <div className="bank-header">
        <h1>CRYPTKEY BANK</h1>
        <p>Secure ATM Banking System</p>
      </div>

      <div className="user-info">
        <h3>Welcome, {username}</h3>
        <p>Card Number: {maskedCard}</p>
      </div>

      <div className="balance-card">
        <h2>Available Balance</h2>
        <p className="balance">₹ 25,000</p>
      </div>

      <div className="services">
        <button>Withdraw Cash</button>
        <button>Deposit Money</button>
        <button>Balance Inquiry</button>

        <button onClick={() => setShowStatement(true)}>
          Mini Statement
        </button>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      {/* MINI STATEMENT POPUP */}
      {showStatement && (
        <div className="statement-overlay">

          <div className="statement-box">

            <h2>Mini Statement</h2>

            <hr/>

            <p>User Name : {username}</p>
            <p>Card Number : {maskedCard}</p>
            <p>Date : {date}</p>
            <p>Time : {time}</p>

            <hr/>

            <h3>Security Details</h3>

            <p>PIN Entry Method : Dynamic Keypad</p>
            <p>Card Verification : Successful</p>
            <p>PIN Verification : Successful</p>
            <p>Session Status : Secure Login</p>

            <hr/>

            <button onClick={downloadStatement}>
              Download Report
            </button>

            <button
              className="close-btn"
              onClick={() => setShowStatement(false)}
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;