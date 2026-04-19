import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import AlertMessage from "../../Components/alert";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: false });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!values.email.trim()) {
      newErrors.email = true;
      AlertMessage("Missing Field", "Email is required", "warning");
      return;
    }
    if (!values.password.trim()) {
      newErrors.password = true;
      AlertMessage("Missing Field", "Password is required", "warning");
      return;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        u => u.email === values.email && u.password === values.password
      );

      if (user) {
        AlertMessage("Success", "Login Successful", "success");
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("loggedEmail", values.email); // ← ADDED: saves logged-in user's email
        navigate("/dashboard");
      } else {
        AlertMessage("Login Failed", "Invalid Email or Password", "error");
      }
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-left">
          <span className="tag">COMMUNITY ACCESS</span>
          <h1>
            Welcome Back
            to HelpHub
          </h1>
          <p>
            Login and continue your journey helping
            and getting help from your community
            with premium experience.
          </p>
          <ul>
            <li>Access your dashboard</li>
            <li>Continue community interaction</li>
            <li>Persistent login session</li>
          </ul>
        </div>
        <div className="auth-right">
          <span className="small-tag">LOGIN</span>
          <h2>
            Authenticate your
            community profile
          </h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            <button className="auth-btn">
              Continue to dashboard
            </button>
            <div className="forgot-link">
              <span onClick={() => navigate("/forgotPassword")}>
                Forgot Password ?
              </span>
            </div>
            <div className="login-link">
              Don't have account ?
              <span onClick={() => navigate("/signup")}>
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;