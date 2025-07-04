import API from '../utils/api';

// Get all users
export const fetchAllUsers = async () => {
  const res = await API.get('/users');
  return res.data;
};

// Delete a user
export const deleteUserById = async (id) => {
  const res = await API.delete(`/users/${id}`);
  return res.data;
};
