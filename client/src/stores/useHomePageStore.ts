import { create } from "zustand";

interface HomePageState {
  date: Date;
  setDate: (date: Date) => void;

  assigningActionTodoId: number | null;
  setAssigningActionTodo: (id: number | null) => void;

  assigningPlanTodoId: number | null;
  setAssigningPlanTodo: (id: number | null) => void;
}

export const useHomePageStore = create<HomePageState>((set) => ({
  date: new Date(),
  setDate: (date) => set({ date }),

  assigningActionTodoId: null,
  setAssigningActionTodo: (id) => set({ assigningActionTodoId: id }),

  assigningPlanTodoId: null,
  setAssigningPlanTodo: (id) => set({ assigningPlanTodoId: id }),
}));
