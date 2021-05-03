import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    vocabulary: [],
    isDictOpen: false,
    isFlashCardsOpen: false,
    isMatchingOpen: false,
    selectedChapterIndex: '',
    chapterWords: [],
    currentFlashCard: 0,
    isChapterFinished: false,
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

    openMatching: (state) => {
      state.isMatchingOpen = true;
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

    getCurrentLearningState: (state, action) => {
      state.isChapterFinished = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchVocabulary,
  toggleDict,
  openFlashCards,
  openMatching,
  selectChapter,
  getChapterWords,
  getCurrentFlashCard,
  getCurrentLearningState,
} = gameSlice.actions;

export const selectGame = (state) => state.game;

export default gameSlice.reducer;
