import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    vocabulary: [],
    isDictOpen: false,
    isFlashCardsOpen: false,
    isMatchingOpen: false,
    isTestOpen: false,
    selectedChapterIndex: '',
    chapterWords: [],
    currentFlashCard: 0,
    isChapterFinished: false,
    matching: {
      first: null,
      second: null,
    },
    pairsNum: null,
    testResult: 0,
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

    openTest: (state) => {
      state.isTestOpen = true;
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

    getFirstWord: (state, action) => {
      state.matching.first = action.payload;
    },

    getSecondWord: (state, action) => {
      state.matching.second = action.payload;
    },

    getPairsNumber: (state, action) => {
      state.pairsNum = action.payload;
    },

    getTestResult: (state, action) => {
      state.testResult = action.payload;
    },

  },
});

// Action creators are generated for each case reducer function
export const {
  fetchVocabulary,
  toggleDict,
  openFlashCards,
  openMatching,
  openTest,
  selectChapter,
  getChapterWords,
  getCurrentFlashCard,
  getCurrentLearningState,
  getFirstWord,
  getSecondWord,
  getPairsNumber,
  getTestResult,
} = gameSlice.actions;

export const selectGame = (state) => state.game;

export default gameSlice.reducer;
