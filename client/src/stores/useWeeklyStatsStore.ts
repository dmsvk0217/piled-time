import { fetchWeeklyPlannerData } from "@/api/statsApi";
import { WeeklyData } from "@/types/stats.type";
import { create } from "zustand";

interface WeeklyStatsState {
  date: Date;
  setDate: (date: Date) => void;

  weeklyData: WeeklyData;
  fetchWeeklyPlannerData: (date: Date) => Promise<void>;
}

export const useWeeklyStatsStore = create<WeeklyStatsState>((set) => ({
  date: new Date(),
  setDate: (date) => set({ date }),

  weeklyData: [],
  fetchWeeklyPlannerData: async (date) => {
    const res = await fetchWeeklyPlannerData(date.toISOString());
    set({ weeklyData: res });
  },
}));
