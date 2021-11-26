import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './features/auth/userSlice';
import gameReducer from './features/game/gameSlice';

const userPersistConfig = {
  key: 'user',
  version: 1,
  storage,
};

const gamePersistConfig = {
  key: 'game',
  version: 1,
  storage,
};

const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userReducer),
    game: persistReducer(gamePersistConfig, gameReducer),
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export { store, persistor };
