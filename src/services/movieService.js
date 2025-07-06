// src/services/movieService.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api'; // adjust if different

export const getAllMovies = async () => {
  const { data } = await axios.get(`${API_BASE}/movies`);
  return data;
};
