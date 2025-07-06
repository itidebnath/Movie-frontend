import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Dashboard from "./pages/Dashboard";
import AdminUserListPage from './pages/AdminUserListPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Load user from localStorage when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
    localStorage.setItem("token", userData.token); // ✅ Also store token separately
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  };

  const handleProfileUpdate = (updatedUser) => {
    const token = localStorage.getItem("token");
    const updatedWithToken = { ...updatedUser, token };
    setUser(updatedWithToken);
    localStorage.setItem("userInfo", JSON.stringify(updatedWithToken));
  };

  return (
    <Router>
      <Navbar
        user={user}
        onLogout={handleLogout}
        setSearchTerm={setSearchTerm}
      />
      
      <Routes>
        <Route path="/" element={<Home onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/movies" element={<Movies searchTerm={searchTerm} />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              user={user}
              onLogout={handleLogout}
              onEditProfile={handleProfileUpdate}
            />
          }
        />
        <Route path="/admin/users" element={<AdminUserListPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
