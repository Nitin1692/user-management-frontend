import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/userSlice";
import axios from "axios";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      dispatch(setCurrentUser(response.data.result));
      navigate('/home')
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  function handleregister() {
    navigate('/register')
  }
  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <input
        className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p onClick={handleregister}>New user? Register</p>
    </div>
  );
}

export default Login;
