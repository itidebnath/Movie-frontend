import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(user);
  }, []);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.search.value.trim();
    if (keyword) {
      navigate(`/movies?search=${encodeURIComponent(keyword)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/');
  };
  const handleLoginSuccess = (data) => {
  localStorage.setItem('userInfo', JSON.stringify(data));
  setUserInfo(data); // ✅ This updates the Navbar immediately
};


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Bongovia</h1>

        <form onSubmit={handleSearch} className="search-form">
          <input type="text" name="search" placeholder="Search movies..." />
          <button type="submit">🔍</button>
        </form>
      </div>

      <div className="navbar-right">
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/dashboard">Dashboard</Link>
          {userInfo && (
            <>
              

              {userInfo?.isAdmin && (
                <Link to="/admin/users">Admin Panel</Link>
              )}

              <button className="bti" onClick={handleLogout}>Logout</button>
            </>
          )}

          {!userInfo && (
            <>
              <div className="auth-buttons">
                <button className="bti" onClick={() => setShowLogin(true)}>Login</button>
              </div>

              {showLogin && (
                <LoginModal
                  onClose={() => setShowLogin(false)}
                  onLoginSuccess={handleLoginSuccess}
                  onSwitchToSignup={() => {
                    setShowLogin(false);
                    setShowSignup(true);
                  }}
                />
              )}

              {showSignup && (
                <SignUpModal
                  onClose={() => setShowSignup(false)}
                  onSwitchToLogin={() => {
                    setShowSignup(false);
                    setShowLogin(true);
                  }}
                />
              )}
            </>
          )}
        </div>

        <button className="hamburger" onClick={handleToggle}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
