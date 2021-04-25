import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    vocabulary: [],
    isDictOpen: false,
    isFlashCardsOpen: false,
    selectedChapterIndex: '',
    chapterWords: [],
    currentFlashCard: 0,
  },
  reducers: {
    fetchVocabulary: (state, action) => {
      state.vocabulary = action.payload;
    },

    toggleDict: (state) => {
      state.isDictOpen = !state.isDictOpen;
    },

    openFlashCards: (state) => {
      state.isFlashCardsOpen = true;
    },

    selectChapter: (state, action) => {
      state.selectedChapterIndex = action.payload;
    },

    getChapterWords: (state, action) => {
      state.chapterWords = action.payload;
    },

    getCurrentFlashCard: (state, action) => {
      state.currentFlashCard = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchVocabulary,
  toggleDict,
  openFlashCards,
  selectChapter,
  getChapterWords,
  getCurrentFlashCard,
} = gameSlice.actions;

export const selectGame = (state) => state.game;

export default gameSlice.reducer;
