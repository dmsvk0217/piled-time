import { fetchWeeklyPlannerData } from "@/api/statsApi";
import { WeeklyData } from "@/types/stats.type";
import { create } from "zustand";

interface WeeklyStatsState {
  weeklyData: WeeklyData;
  fetchWeeklyPlannerData: (date: string) => Promise<void>;
}

export const useWeeklyStatsStore = create<WeeklyStatsState>((set) => ({
  weeklyData: [],
  fetchWeeklyPlannerData: async (date) => {
    const res = await fetchWeeklyPlannerData(date);
    set({ weeklyData: res });
  },
}));
