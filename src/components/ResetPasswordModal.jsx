import React, { useState } from "react";
import API from "../utils/api";
import "./LoginModal.css"; // Reuse the same CSS

const ResetPasswordModal = ({ token, onClose }) => {
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/users/reset-password", {
        token,
        password: newPassword,
      });

      alert(data.message || "Password reset successful!");
      onClose(); // Close modal
    } catch (error) {
      alert(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Reset Password</h2>

        <form onSubmit={handleReset} className="modal-form">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
