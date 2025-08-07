import api from "../axios";

export interface UserData {
  user_id: number;
  username: string;
  total_xp: number;
  current_streak: number;
  last_activity_date: string;
  progress_percentage: number;
  lessons_completed: number;
  total_lessons: number;
}

export async function getProfile(): Promise<UserData> {
  const res = await api.get<UserData>("/api/profile/");

  return res.data;
}
