// src/features/movies/movieService.js

import axios from 'axios';

const API_KEY = 'ddc0a1fe'; // Replace with your real API key
const BASE_URL = 'https://www.omdbapi.com/';

// Fetch movies by search query (example: "avengers")
export const fetchMovies = async (query = 'avengers') => {
  const response = await axios.get(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
  return response.data.Search; // returns an array of movies
};
