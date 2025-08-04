import { Feedback, FeedbackCreateRequest, FeedbackType } from "@/types/feedback";
import api from "./axiosApi";

export const fetchFeedbackByDateAndType = async (
  date: Date,
  type: FeedbackType
): Promise<Feedback> => {
  const res = await api.get<Feedback[]>("/api/feedbacks", {
    params: { type, date },
  });
  return res.data[0];
};

export const fetchDailyFeedbackByDate = async (date: Date): Promise<Feedback | null> => {
  const res = await api.get<Feedback>("/api/feedbacks/daily", {
    params: { date: date.toISOString() },
  });
  return res.data;
};

export const fetchWeeklyFeedbackByDate = async (date: Date): Promise<Feedback | null> => {
  const res = await api.get<Feedback>("/api/feedbacks/weekly", {
    params: { date: date.toISOString() },
  });
  return res.data;
};

export const fetchDailyFeedbacksOfWeek = async (date: Date): Promise<Feedback[]> => {
  const res = await api.get<Feedback[]>("/api/feedbacks/daily/weekly", {
    params: { date: date.toISOString() },
  });
  return res.data;
};

export const createFeedback = async (data: FeedbackCreateRequest): Promise<Feedback> => {
  const res = await api.post<Feedback>("/api/feedbacks", data);
  return res.data;
};

export const updateFeedback = async (
  id: number,
  data: Partial<FeedbackCreateRequest>
): Promise<Feedback> => {
  const res = await api.patch<Feedback>(`/api/feedbacks/${id}`, data);
  return res.data;
};

export const deleteFeedback = async (id: number): Promise<void> => {
  await api.delete(`/api/feedbacks/${id}`);
};
