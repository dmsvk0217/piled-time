import { Action } from "@/types/action";
import api from "./axiosApi";

export const fetchActions = async (date: string): Promise<Action[]> => {
  const res = await api.get<Action[]>("/api/actions", { params: { date } });
  return res.data;
};

export const createAction = async (
  todoId: number,
  startAt: string,
  duration: number
): Promise<Action> => {
  const res = await api.post<Action>("/api/actions", {
    todoId,
    startAt,
    duration,
  });
  return res.data;
};

export const updateAction = async (
  id: number,
  data: Partial<{ startAt: string; duration: number }>
): Promise<Action> => {
  const res = await api.patch<Action>(`/api/actions/${id}`, data);
  return res.data;
};

export const deleteAction = async (id: number): Promise<void> => {
  await api.delete(`/api/actions/${id}`);
};
