import { createSlice } from '@reduxjs/toolkit';
import { logIn, refreshUser } from './operations';
const NAME = 'auth';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  inRefreshing: false,
  isLoading: false,
  error: null,
};
const authSlice = createSlice({
  name: NAME,
  initialState,
  extraReducers: {
    [logIn.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },

    [refreshUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.inRefreshing = false;
      state.isLoading = false;
    },
  },
});

export const authReducer = authSlice.reducer;
