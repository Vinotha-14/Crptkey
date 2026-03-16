import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="atm-bg">

      <div className="atm-container">

        <h1>CRYPTKEY ATM</h1>

        <p>Secure PIN Authentication System</p>

        <div className="home-buttons">

          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/register")}>
            Register
          </button>

        </div>

      </div>

    </div>
  );
}

export default Home;