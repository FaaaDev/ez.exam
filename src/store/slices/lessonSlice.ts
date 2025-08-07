import type { LessonDetail, LessonsData } from "@/lib/api/lessons";
import { createSlice } from "@reduxjs/toolkit";

type LessonSlice = {
  isLoading: boolean;
  attemptId?: string | null;
  list: LessonsData[];
  detail?: LessonDetail | null;
};

const initialState: LessonSlice = {
  isLoading: true,
  attemptId: null,
  list: [],
  detail: null,
};

const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    lessonList(state, { payload }) {
      state.list = payload;
    },
    setLessonDetail(state, { payload }) {
      state.detail = payload;
    },
    setLoadingLesson(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export const { lessonList, setLoadingLesson, setLessonDetail } = lessonSlice.actions;
export default lessonSlice.reducer;
