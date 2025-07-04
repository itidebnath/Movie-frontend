import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './AdminUserListPage.css';

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    genre: '',
    releaseYear: '',
    posterUrl: '',
    trailerUrl: '',
    cast: '',
  });

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/');
      return;
    }

    const fetchUsers = async () => {
      try {
        const { data } = await API.get('/users');
        setUsers(data);
      } catch (error) {
        
      }
    };

    const fetchMovies = async () => {
      try {
        const { data } = await API.get('/movies');
        setMovies(data);
      } catch (error) {
        
      }
    };

    fetchUsers();
    fetchMovies();
  }, [navigate, userInfo]);

  const deleteUserHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const deleteMovieHandler = async (id) => {
    if (window.confirm('Delete this movie?')) {
      try {
        await API.delete(`/movies/${id}`);
        setMovies(movies.filter((movie) => movie._id !== id));
      } catch (error) {
        alert('Failed to delete movie');
      }
    }
  };

  const addMovieHandler = async () => {
    const { title, description, posterUrl, trailerUrl, genre, cast, releaseYear } = newMovie;

    if (!title || !description || !posterUrl || !trailerUrl || !genre || !cast || !releaseYear) {
      alert('Please fill all fields!');
      return;
    }

    try {
      const { data: createdMovie } = await API.post('/movies', {
  ...newMovie,
  genre: genre.split(',').map((g) => g.trim()),
  cast: cast.split(',').map((c) => c.trim()),
  releaseYear: Number(releaseYear),
});

      const { data } = await API.get('/movies');
      setMovies((prevMovies) => [...prevMovies, createdMovie]);
      setNewMovie({
        title: '',
        description: '',
        genre: '',
        releaseYear: '',
        posterUrl: '',
        trailerUrl: '',
        cast: '',
      });
    } catch (error) {
      alert('Failed to add movie');
    }
  };

  return (
    <div className="admin-page">
      <h2>👤 Admin Panel – User List</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? '✅' : '❌'}</td>
              <td>
                <button onClick={() => deleteUserHandler(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />
      <h2>🎬 Movie Management</h2>

      <div className="movie-form">
        <input
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newMovie.description}
          onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre (comma-separated)"
          value={newMovie.genre}
          onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Release Year"
          value={newMovie.releaseYear}
          onChange={(e) => setNewMovie({ ...newMovie, releaseYear: e.target.value })}
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={newMovie.posterUrl}
          onChange={(e) => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
        />
        <input
          type="text"
          placeholder="Trailer URL"
          value={newMovie.trailerUrl}
          onChange={(e) => setNewMovie({ ...newMovie, trailerUrl: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cast (comma-separated)"
          value={newMovie.cast}
          onChange={(e) => setNewMovie({ ...newMovie, cast: e.target.value })}
        />
        <button onClick={addMovieHandler}>Add Movie</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Genres</th>
            <th>Release Year</th>
            <th>Description</th>
            <th>Trailer</th>
            <th>Cast</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>
                <img src={movie.posterUrl} alt={movie.title} width="50" />
              </td>
              <td>{movie.title}</td>
              <td>{movie.genre?.join(', ')}</td>
              <td>{movie.releaseYear}</td>
              <td>{movie.description}</td>
              <td>
                <a href={movie.trailerUrl} target="_blank" rel="noreferrer">Watch</a>
              </td>
              <td>{movie.cast?.join(', ')}</td>
              <td>
                <button onClick={() => deleteMovieHandler(movie._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserListPage;
