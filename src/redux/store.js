import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import quizApi from "./quizApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});
