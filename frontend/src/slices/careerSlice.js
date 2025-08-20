import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  suggestions: [],
  roadmap: [],
  feedback: "",
};

const careerSlice = createSlice({
  name: 'career',
  initialState,
  reducers: {
    setSuggestions(state, action) {
      state.suggestions = action.payload.careers;
      state.roadmap = action.payload.roadmap;
    },
    setFeedback(state, action) {
      state.feedback = action.payload;
    },
  },
});

export const { setSuggestions, setFeedback } = careerSlice.actions;
export default careerSlice.reducer;
