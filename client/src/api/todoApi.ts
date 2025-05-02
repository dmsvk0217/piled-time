import { Todo } from "@/types/todo";
import api from "./axios";

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await api.get<Todo[]>("/api/todos");
  return res.data;
};
