// src/pages/MovieDetails.jsx
import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const movie = state?.movie;
 


  if (!movie) {
    return (
      <div className="movie-details-error">
        <p>⚠️ Movie data not found.</p>
        <button onClick={() => navigate("/movies")} className="back-button">
          ← Go Back to Movies
        </button>
      </div>
      
    );
  }

  const {
    title,
    description,
    poster,
    genre,
    releaseDate,
    rating,
    director,
    trailer, // This is assumed to be a video or YouTube link
  } = movie;

  return (
    <div className="movie-details-container">
      <div className="movie-details-card">
        <img
          className="movie-details-poster"
          src={poster || placeholderPoster}
          alt={title}
        />
        <div className="movie-details-info">
          <h2>{title}</h2>
          <p><strong>Genre:</strong> {genre}</p>
          <p><strong>Release Date:</strong> {releaseDate}</p>
          <p><strong>Rating:</strong> {rating}/10</p>
          <p><strong>Director:</strong> {director}</p>
          <p className="movie-details-description">{description}</p>
        </div>
      </div>

      {/* Movie trailer or full video embed */}
      {trailer && (
        <div className="movie-player-wrapper">
          <h3>🎬 Watch Now:</h3>
          <iframe
            src={trailer}
            title={`Watch ${title}`}
            allow="autoplay; fullscreen"
            frameBorder="0"
            allowFullScreen
            className="movie-player"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
