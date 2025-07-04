import React, { useState } from "react";
import "./LoginModal.css"; // Reuse same CSS
import API from "../utils/api";

const SignUpModal = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/users/register", formData);
      alert("Registration successful!");
      localStorage.setItem("userInfo", JSON.stringify(data));
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup} className="modal-form">
          <input
            name="name"
            placeholder="Enter Name"
            required
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            required
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter 10 digit Password"
            required
            onChange={handleChange}
          />
          <button type="submit">Register</button>

          <div className="login-links">
            <button type="button" onClick={onSwitchToLogin} className="link-btn">
              Already have an account? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
