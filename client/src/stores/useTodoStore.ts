import { fetchDailyPlanner } from "@/api/plannerApi";
import { Todo } from "@/types/todo";
import { create } from "zustand";

interface TodoState {
  todoDetails: Todo[];
  fetchTododetails: (date: Date) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todoDetails: [],
  fetchTododetails: async (date) => {
    const res = await fetchDailyPlanner(date.toISOString());
    set({ todoDetails: res.todos });
  },
}));
