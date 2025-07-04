import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies } from './movieService';

export const getMovies = createAsyncThunk('movies/getMovies', async (query) => {
  const data = await fetchMovies(query);
  return data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
