import { create } from "zustand";

interface HomePageState {
  date: string;
  setDate: (date: string) => void;

  assigningActionTodoId: number | null;
  setAssigningActionTodo: (id: number | null) => void;

  assigningPlanTodoId: number | null;
  setAssigningPlanTodo: (id: number | null) => void;
}

export const useHomePageStore = create<HomePageState>((set) => ({
  date: new Date().toISOString().slice(0, 10),
  setDate: (date) => set({ date }),

  assigningActionTodoId: null,
  setAssigningActionTodo: (id) => set({ assigningActionTodoId: id }),

  assigningPlanTodoId: null,
  setAssigningPlanTodo: (id) => set({ assigningPlanTodoId: id }),
}));
