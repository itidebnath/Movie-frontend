// src/services/movieService.js
import axios from 'axios';

const API_BASE = 'https://moviesite-production-c144.up.railway.app/api'; // adjust if different

export const getAllMovies = async () => {
  const { data } = await axios.get(`${API_BASE}/movies`);
  return data;
};
