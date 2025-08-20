import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import careerReducer from './slices/careerSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    career: careerReducer,
    ui: uiReducer,
  },
});
