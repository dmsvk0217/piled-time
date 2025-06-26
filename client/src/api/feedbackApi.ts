import api from "./axios";

export interface Feedback {
  id: number;
  type: "DAILY" | "WEEKLY" | "MONTHLY";
  date: string;
  goodPoint: string;
  badPoint: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackCreateRequest {
  type: "DAILY";
  date: string;
  goodPoint: string;
  badPoint: string;
  comment: string;
}

export const fetchDailyFeedback = async (date: string): Promise<Feedback | null> => {
  const res = await api.get<Feedback[]>("/api/feedbacks", { params: { type: "DAILY", date } });
  return res.data.length > 0 ? res.data[0] : null;
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
