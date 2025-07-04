import React, { useState } from "react";
import "./LoginModal.css";
import API from "../utils/api"; // 👈 import axios instance
import ResetPasswordModal from "./ResetPasswordModal"; // 👈 Add this import at top
const LoginModal = ({ onClose, onLoginSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetToken, setResetToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/users/login", { email, password });

      alert("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (onLoginSuccess) onLoginSuccess(data);

      onClose(); // close modal
    } catch (error) {
      
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      const { data } = await API.post("/users/forgot-password", { email });
      alert(data.message || "Reset token generated");
      setResetToken(data.token);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send reset link");
    }
  };


  const handleSignupInstead = () => {
    onSwitchToSignup(); // 👈 Trigger the switch to SignUp modal
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Login</h2>

        <form onSubmit={handleLogin} className="modal-form">
          <input
            type="email"
            placeholder=" Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder=" Enter 10 digit Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          <div className="login-links">
            <button type="button" onClick={handleForgotPassword} className="link-btn">
              Forgot Password?
            </button>
            <span className="divider">|</span>
            <button type="button" onClick={handleSignupInstead} className="link-btn">
              Sign Up instead
            </button>
          </div>
        </form>
      </div>
      {resetToken && (
        <ResetPasswordModal
          token={resetToken}
          onClose={() => setResetToken(null)}
        />
      )}

    </div>
  );
};

export default LoginModal;
