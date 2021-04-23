import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    vocabulary: [],
    isDictOpen: false,
    view: '',
  },
  reducers: {
    fetchVocabulary: (state, action) => {
      state.vocabulary = action.payload;
    },

    changeView: (state, action) => {
      state.view = action.payload;
    },

    toggleDict: (state) => {
      state.isDictOpen = !state.isDictOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchVocabulary, toggleDict, changeView } = gameSlice.actions;

export const selectGame = (state) => state.game;

export default gameSlice.reducer;
