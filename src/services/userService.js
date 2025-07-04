import API from '../utils/api';

// Register new user
export const registerUser = async (userData) => {
  const response = await API.post('/users/register', userData);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await API.post('/users/login', userData);
  return response.data;
};
