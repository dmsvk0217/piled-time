import { Plan } from "@/types/plan";
import api from "./axiosApi";

export const fetchPlans = async (date: string): Promise<Plan[]> => {
  const res = await api.get<Plan[]>("/api/plans", { params: { date } });
  return res.data;
};

export const createPlan = async (
  todoId: number,
  startAt: string,
  duration: number
): Promise<Plan> => {
  const res = await api.post<Plan>("/api/plans", {
    todoId,
    startAt,
    duration,
  });
  return res.data;
};

export const updatePlan = async (
  id: number,
  data: Partial<{ startAt: string; duration: number }>
): Promise<Plan> => {
  const res = await api.patch<Plan>(`/api/plans/${id}`, data);
  return res.data;
};

export const deletePlan = async (id: number): Promise<void> => {
  await api.delete(`/api/plans/${id}`);
};
