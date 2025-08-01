import { fetchDailyPlanner } from "@/api/planner";
import { Todo } from "@/types/todo";
import { create } from "zustand";

interface TodoState {
  todoDetails: Todo[];
  fetchTododetails: (date: string) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todoDetails: [],
  fetchTododetails: async (date) => {
    const res = await fetchDailyPlanner(date);
    set({ todoDetails: res.todos });
  },
}));
