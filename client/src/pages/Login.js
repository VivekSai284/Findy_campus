import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        "http://localhost:5000/auth/login",
        loginData,
      );

      localStorage.setItem("token", resp.data.token);

      toast.success("Login Successful");

      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="LoginForm">
      <h1 className="Login">Login</h1>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={loginData.email}
          onChange={(e) => {
            setLoginData({
              ...loginData,
              email: e.target.value,
            });
          }}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={loginData.password}
          onChange={(e) => {
            setLoginData({
              ...loginData,
              password: e.target.value,
            });
          }}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
