import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import AlertMessage from "../../Components/alert";

const SignUp = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    fullName: "",
    role: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: false
    })

  }

  const handleSubmit = (e) => {

    e.preventDefault();

    let newErrors = {};

    if (!values.fullName.trim()) {
      newErrors.fullName = true;
      AlertMessage("Missing Field", "Full Name is required", "warning")
      return;
    }

    if (!values.role) {
      newErrors.role = true;
      AlertMessage("Missing Field", "Role selection is required", "warning")
      return;
    }

    if (!values.email.trim()) {
      newErrors.email = true;
      AlertMessage("Missing Field", "Email is required", "warning")
      return;
    }

    if (!values.password.trim()) {
      newErrors.password = true;
      AlertMessage("Missing Field", "Password is required", "warning")
      return;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userExist = users.find(
        user => user.email === values.email
      )

      if (userExist) {
        AlertMessage("Account Exists", "Email already registered", "error")
        return;
      }

      users.push(values);

      localStorage.setItem("users", JSON.stringify(users));

      AlertMessage("Success", "Account Created Successfully", "success");

      navigate("/login");

    }

  }

  return (

    <div className="auth-container">

      <div className="auth-wrapper">

        <div className="auth-left">

          <span className="tag">COMMUNITY ACCESS</span>

          <h1>
            Enter the support
            network.
          </h1>

          <p>
            Choose your identity, set your role, and jump into
            a multi-page product flow designed for asking, offering,
            and tracking help with a premium interface.
          </p>

          <ul>
            <li>Role-based entry for Need Help, Can Help, or Both</li>
            <li>Direct path into dashboard and community feed</li>
            <li>Persistent session powered by LocalStorage</li>
          </ul>

        </div>

        <div className="auth-right">

          <span className="small-tag">LOGIN / SIGNUP</span>

          <h2>
            Authenticate your
            community profile
          </h2>

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className={errors.fullName ? "error" : ""}
            />

            <label>Role Selection</label>

            <select
              name="role"
              value={values.role}
              onChange={handleChange}
              className={errors.role ? "error" : ""}
            >

              <option value="">Select Role</option>
              <option>Need Help</option>
              <option>Can Help</option>
              <option>Both</option>

            </select>

            <div className="row">

              <div>

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />

              </div>

              <div>

                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                />

              </div>

            </div>

            <button className="auth-btn">
              Create Account
            </button>

            <div className="login-link">
              Already have account ?
              <span onClick={() => navigate("/login")}>
                Login
              </span>
            </div>

          </form>

        </div>

      </div>

    </div>

  )

}

export default SignUp;