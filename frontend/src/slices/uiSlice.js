import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkTheme: true,
  language: 'en',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { toggleTheme, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
