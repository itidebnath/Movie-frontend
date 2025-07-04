import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import { getAllMovies } from '../services/movieService';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [playingTrailerId, setPlayingTrailerId] = useState(null); // track which trailer is playing
  const location = useLocation(); 
    const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getAllMovies();
        setMovies(res);
        setFilteredMovies(res);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

    useEffect(() => {
    const searchTerm = getSearchQuery().toLowerCase();

    if (!searchTerm) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
      );
      setFilteredMovies(filtered);
    }
  }, [location.search, movies]); // ✅ now depends on URL


  // Extract YouTube video ID
  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="movies-container">
      <h2 style={{ marginTop: '60px' }}>🎞️ All Movies</h2>
      <div className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => {
            const isPlaying = playingTrailerId === movie._id;
            const videoId = getYouTubeId(movie.trailerUrl);

            return (
              <div className="movie-card" key={movie._id}>
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
                  <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
                )}
                <h4>{movie.title}</h4>
                <button
                  className="watch-button"
                  onClick={() =>
                    setPlayingTrailerId(isPlaying ? null : movie._id)
                  }
                >
                  {isPlaying ? '⏹️ Stop' : '🎥 Watch Now'}
                </button>
              </div>
            );
          })
        ) : (
          <p style={{ color: "gray", marginTop: "20px" }}>No movies found 😢</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
