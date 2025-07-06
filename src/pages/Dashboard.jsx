import React, { useState } from "react";
import "./Dashboard.css";
import API from "../utils/api"; // ✅ Axios instance with token auto-added
import { useEffect } from "react";




const Dashboard = ({ user, onEditProfile, onLogout }) => {
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    photo: user?.photo || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    address: user?.address || "",
  });

  const [previewURL, setPreviewURL] = useState(
    user?.photo?.startsWith("http")
      ? user.photo
      : `http://moviesite-production-c144.up.railway.app/${user?.photo || ""}` // ✅ fixed here
  );

  useEffect(() => {
    if (user?.photo) {
      const newPreviewURL = user.photo.startsWith("http")
        ? user.photo
        : `http://moviesite-production-c144.up.railway.app/${user.photo}`; // ✅ fixed here
      setPreviewURL(newPreviewURL);
    }
  }, [user]);
  


  // Handle text input changes
  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Handle profile photo preview and file selection
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedUser({ ...updatedUser, photo: file });
      setPreviewURL(URL.createObjectURL(file)); // Instant preview
    }
  };

  // Final update submit function
  const handleUpdateSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", updatedUser.name);
      formData.append("email", updatedUser.email);
      if (updatedUser.photo instanceof File) {
        formData.append("photo", updatedUser.photo);
      }
      formData.append("phone", updatedUser.phone);
      formData.append("bio", updatedUser.bio);
      formData.append("address", updatedUser.address);

      // ✅ Get token from localStorage


      const response = await API.put(`/users/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },


      });

      console.log("✅ Updated user:", response.data);

      onEditProfile(response.data);
      setEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ Update error:", err.response?.data || err.message);
      alert("❌ Failed to update profile");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src={previewURL} alt="Profile" className="profile-pic" />

        {!editing ? (
          <div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            {user?.phone && <p>📞 {user.phone}</p>}
            {user?.address && <p>🏠 {user.address}</p>}
            {user?.bio && <p>🧾 {user.bio}</p>}

          </div>
        ) : (
          <div className="edit-form">
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <input
              type="text"
              name="phone"
              value={updatedUser.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
            <input
              type="text"
              name="address"
              value={updatedUser.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
            <textarea
              name="bio"
              value={updatedUser.bio}
              onChange={handleInputChange}
              placeholder="Short Bio"
            />
          
            <button onClick={handleUpdateSubmit}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
            

          </div>
        )}

        <div className="dashboard-actions">
          {!editing && (
          <>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
          <button onClick={onLogout} className="secondary-button">Logout</button>
          </>
          )}
        </div>
      </div>






    </div>
  );
};

export default Dashboard;
