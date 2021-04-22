import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    vocabulary: [],
    isDictOpen: false,
  },
  reducers: {
    fetchVocabulary: (state, action) => {
      state.vocabulary = action.payload;
    },

    toggleDict: (state) => {
      state.isDictOpen = !state.isDictOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchVocabulary, toggleDict } = gameSlice.actions;

export const selectGame = (state) => state.game;

export default gameSlice.reducer;
