import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgotPassword.css";
import AlertMessage from "../../Components/alert";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("email");

  const [values, setValues] = useState({
    email: "",
    contact: "",
    newPassword: "",
    confirmPassword: ""
  });

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const verifyUser = () => {

    if (method === "email") {

      const user = users.find(u => u.email === values.email);

      if (user) {
        AlertMessage("Success", "Email Verified", "success");
        setStep(2);
      } else {
        AlertMessage("Error", "Email not found", "error");
      }

    }

    if (method === "contact") {

      const user = users.find(u => u.contact === values.contact);

      if (user) {
        AlertMessage("Success", "Contact Verified", "success");
        setStep(2);
      } else {
        AlertMessage("Error", "Contact not found", "error");
      }

    }

  }

  const updatePassword = () => {

    if (values.newPassword !== values.confirmPassword) {
      AlertMessage("Error", "Passwords do not match", "error");
      return;
    }

    if (!values.newPassword.trim()) {
      AlertMessage("Error", "Password required", "error");
      return;
    }

    const updatedUsers = users.map(user => {

      if (
        (method === "email" && user.email === values.email) ||
        (method === "contact" && user.contact === values.contact)
      ) {
        return {
          ...user,
          password: values.newPassword
        }
      }

      return user;

    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    AlertMessage("Success", "Password Updated Successfully", "success");

    navigate("/login");

  }

  return (

    <div className="auth-container">

      <div className="auth-wrapper">

        <div className="auth-left">

          <span className="tag">RESET PASSWORD</span>

          <h1>
            Recover your
            account access
          </h1>

          <p>
            Verify your identity and create a new
            password to continue using HelpHub.
          </p>

          <ul>

            <li>Email verification</li>
            <li>Contact verification</li>
            <li>Secure password reset</li>

          </ul>

        </div>


        <div className="auth-right">

          <span className="small-tag">FORGOT PASSWORD</span>

          <h2>
            Reset your
            password
          </h2>


          {step === 1 && (

            <>

              <div className="method-box">

                <button
                  className={method === "email" ? "active" : ""}
                  onClick={() => setMethod("email")}
                >
                  Email
                </button>

                <button
                  className={method === "contact" ? "active" : ""}
                  onClick={() => setMethod("contact")}
                >
                  Contact
                </button>

              </div>


              {method === "email" && (

                <input
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />

              )}

              {method === "contact" && (

                <input
                  type="text"
                  placeholder="Enter Contact"
                  onChange={(e) => setValues({ ...values, contact: e.target.value })}
                />

              )}

              <button
                className="auth-btn"
                onClick={verifyUser}
              >
                Verify
              </button>

              <div className="login-link">

                <span onClick={() => navigate("/login")}>
                  Back to Login
                </span>

              </div>

            </>

          )}



          {step === 2 && (

            <>

              <label>New Password</label>

              <input
                type="password"
                onChange={(e) => setValues({ ...values, newPassword: e.target.value })}
              />

              <label>Confirm Password</label>

              <input
                type="password"
                onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
              />

              <button
                className="auth-btn"
                onClick={updatePassword}
              >
                Update Password
              </button>

            </>

          )}

        </div>

      </div>

    </div>

  )

}

export default ForgotPassword;