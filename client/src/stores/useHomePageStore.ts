import { create } from "zustand";

interface HomePageState {
  date: Date;
  setDate: (date: Date) => void;

  assigningActionTodoId: number | null;
  setAssigningActionTodoId: (id: number | null) => void;

  assigningPlanTodoId: number | null;
  setAssigningPlanTodoId: (id: number | null) => void;
}

export const useHomePageStore = create<HomePageState>((set) => ({
  date: new Date(),
  setDate: (date) => set({ date }),

  assigningActionTodoId: null,
  setAssigningActionTodoId: (id) => set({ assigningActionTodoId: id }),

  assigningPlanTodoId: null,
  setAssigningPlanTodoId: (id) => set({ assigningPlanTodoId: id }),
}));
