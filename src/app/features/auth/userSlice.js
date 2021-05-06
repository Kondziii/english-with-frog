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
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  getUserGameProgress,
  updateMoneyState,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserInfo = (state) => state.user.info;

export default userSlice.reducer;
