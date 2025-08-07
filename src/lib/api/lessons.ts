import api from "../axios";

export interface LessonsData {
  title: string;
  description: string;
  order_index: number;
  is_active: boolean;
  id: number;
  created_at: string;
  updated_at: string;
  progress_status: {
    is_completed: boolean;
    completion_percentage: number;
  };
}

export interface Problem {
  id: number;
  question: string;
  problem_type: string;
  xp_value: number;
  order_index: number;
  options: {
    option_text: number;
    order_index: number;
    id: number;
  }[];
}

export interface LessonDetail {
  title: string;
  description: string;
  order_index: number;
  is_active: boolean;
  id: number;
  created_at: string;
  updated_at: string;
  problems: Problem[];
}

interface SubmitPayload {
  answer: {
    option_id: number;
    problem_id: number;
  };
  attempt_id: string;
}

export async function getLessons(): Promise<LessonsData[]> {
  const res = await api.get<LessonsData[]>("/api/lessons/");

  return res.data;
}

export async function getLessonsDetail(
  lessonsId: number
): Promise<LessonDetail> {
  const res = await api.get<LessonDetail>(`/api/lessons/${lessonsId}`);

  return res.data;
}

export async function submitAnswer(lessonId:number, payload: SubmitPayload): Promise<LessonDetail> {
  const res = await api.post<LessonDetail>(`/api/lessons/${lessonId}/single`, payload);

  return res.data;
}
