import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  token: null,
  email: null,
  skills: [],
  interests: [],
  resumeText: '',
  authenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.authenticated = true;
    },
    logout(state) {
      return initialState;
    },
    updateProfile(state, action) {
      Object.assign(state, action.payload);
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
