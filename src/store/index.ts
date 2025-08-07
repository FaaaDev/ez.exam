import { configureStore } from "@reduxjs/toolkit";
import lessonReducer from "./slices/lessonSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    lesson: lessonReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;