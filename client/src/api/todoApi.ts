import { Todo } from "@/types/todo";
import api from "./axiosApi";

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await api.get<Todo[]>("/api/todos");
  return res.data;
};

export const createTodo = async (
  categoryId: number,
  date: Date,
  content: string
): Promise<Todo> => {
  const res = await api.post<Todo>("/api/todos", {
    categoryId,
    date: date.toISOString(),
    content,
  });
  return res.data;
};

export const updateTodo = async (
  id: number,
  data: Partial<{ date: string; content: string; percent: number }>
): Promise<Todo> => {
  const res = await api.patch<Todo>(`/api/todos/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/api/todos/${id}`);
};
