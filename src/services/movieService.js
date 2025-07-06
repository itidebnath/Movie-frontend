// src/services/movieService.js
import axios from 'axios';

const API_BASE = 'https://movie-site-0zcr.onrender.com/api'; // adjust if different

export const getAllMovies = async () => {
  const { data } = await axios.get(`${API_BASE}/movies`);
  return data;
};
