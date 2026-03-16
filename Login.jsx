import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try{

      const response = await fetch("http://localhost:5002/api/auth/login",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          username,
          password
        })

      });

      const data = await response.json();

      if(response.ok){

        // ✅ store logged-in user details
        localStorage.setItem("userId",data.userId);
        localStorage.setItem("username",data.username);
        localStorage.setItem("cardNumber",data.cardNumber);

        alert("Login Successful ✅");

        navigate("/card");

      }else{

        alert(data.message || "Login failed");

      }

    }catch(error){

      alert("Server error");

    }

  };

  return(

    <div className="atm-bg">

      <div className="atm-container">

        <h1>ATM Login</h1>

        <form onSubmit={handleLogin}>

          <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
          />

          <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;