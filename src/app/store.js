import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/auth/userSlice';
import gameReducer from './features/game/gameSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});
