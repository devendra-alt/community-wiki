import { configureStore } from '@reduxjs/toolkit';
import authSlice from './feature/authSlice';
import userSlice from './feature/userSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
