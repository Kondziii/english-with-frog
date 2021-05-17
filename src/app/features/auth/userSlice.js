import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    info: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    getUserGameProgress: (state, action) => {
      state.info = action.payload;
    },
    updateMoneyState: (state, action) => {
      state.info.money = action.payload;
    },
    updateFrogstage: (state) => {
      state.info.frogstage = state.info.frogstage + 1;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  getUserGameProgress,
  updateMoneyState,
  updateFrogstage,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserInfo = (state) => state.user.info;

export default userSlice.reducer;
