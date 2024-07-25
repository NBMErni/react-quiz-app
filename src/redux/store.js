import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    // questions: questionsReducer,
    auth: authReducer,
  },
});
