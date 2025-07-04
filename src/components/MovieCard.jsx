import React from "react";
import "./MovieCard.css";

const MovieCard = ({ title, poster, releaseDate, rating }) => {
  return (
    <div className="movie-card">
      <img
        src={poster || placeholderPoster}
        alt={title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-release">Release: {releaseDate || "N/A"}</p>
        <p className="movie-rating">⭐ {rating || "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieCard;
