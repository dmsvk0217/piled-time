import { Feedback, FeedbackCreateRequest } from "@/types/feedback";
import api from "./axiosApi";

export const fetchFeedbacks = async (
  type?: "DAILY" | "WEEKLY",
  date?: string
): Promise<Feedback[]> => {
  const res = await api.get<Feedback[]>("/api/feedbacks", {
    params: { type, date },
  });
  return res.data;
};

export const fetchDailyFeedbackByDate = async (date: string): Promise<Feedback | null> => {
  const res = await api.get<Feedback>("/api/feedbacks/daily", {
    params: { date },
  });
  return res.data;
};

export const fetchWeeklyFeedbackByDate = async (date: string): Promise<Feedback | null> => {
  const res = await api.get<Feedback>("/api/feedbacks/weekly", {
    params: { date },
  });
  return res.data;
};

export const fetchDailyFeedbacksOfWeek = async (date: string): Promise<Feedback[]> => {
  const res = await api.get<Feedback[]>("/api/feedbacks/daily/weekly", {
    params: { date },
  });
  return res.data;
};

export const createDailyFeedback = async (data: FeedbackCreateRequest): Promise<Feedback> => {
  const res = await api.post<Feedback>("/api/feedbacks", data);
  return res.data;
};

export const updateDailyFeedback = async (
  id: number,
  data: Partial<FeedbackCreateRequest>
): Promise<Feedback> => {
  const res = await api.patch<Feedback>(`/api/feedbacks/${id}`, data);
  return res.data;
};

export const deleteDailyFeedback = async (id: number): Promise<void> => {
  await api.delete(`/api/feedbacks/${id}`);
};
