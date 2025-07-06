import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../services/movieService';
import LoginModal from "../components/LoginModal";
import './Home.css';

const Home = ({ onLoginSuccess }) => {
  const [movies, setMovies] = useState([]);
  const [playingTrailerId, setPlayingTrailerId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null); // for managing logged-in user

  // Fetch movies only when user is logged in
  const fetchMovies = async () => {
    try {
      const res = await getAllMovies();
      console.log("Fetched movies:", res);
      setMovies(res);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setShowLogin(false);
      fetchMovies(); // ✅ fetch only if logged in
    } else {
      setShowLogin(true);
    }
  }, []);

  // Handle login success from LoginModal
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
    setShowLogin(false);
    if (onLoginSuccess) onLoginSuccess(userData);
    fetchMovies(); // ✅ fetch after login
  };

  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    return match ? match[1] : null;
  };

  // ✅ Show login modal if not logged in
  if (showLogin) {
    return <LoginModal onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="home-page">
      <section className="home-hero">
        <h1 className="home-title">Welcome to MovieFlix 🎬</h1>
        <p className="home-subtitle">Watch the latest and trending movies, all hand-picked for you!</p>
        <button 
          className="home-browse-button"
          onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
        >
          Browse Movies
        </button>
      </section>

      <h2 className="home-section-heading">🔥 Trending Movies</h2>

      <div className="home-movie-grid">
        {movies.map((movie) => {
          const isPlaying = playingTrailerId === movie._id;
          const videoId = getYouTubeId(movie.trailerUrl);

          return (
            <div className="home-movie-card" key={movie._id}>
              {isPlaying && videoId ? (
                <iframe
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={movie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img src={movie.posterUrl} alt={movie.title} className="home-movie-poster" />
              )}

              <h4 className="home-movie-title">{movie.title}</h4>

              <button
                className="home-watch-button"
                onClick={() => setPlayingTrailerId(isPlaying ? null : movie._id)}
              >
                {isPlaying ? '⏹️ Stop' : '🎥 Watch Now'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
