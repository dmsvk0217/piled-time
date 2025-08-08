import { fetchMonthlyPlannerData } from "@/api/statsApi";
import { MonthlyData } from "@/types/stats.type";
import { create } from "zustand";

interface MonthlyStatsState {
  date: Date;
  setDate: (date: Date) => void;

  monthlyData: MonthlyData;
  fetchMonthlyPlannerData: (date: Date) => Promise<void>;
}

export const useMonthlyStatsStore = create<MonthlyStatsState>((set) => ({
  date: new Date(),
  setDate: (date) => set({ date }),

  monthlyData: [],
  fetchMonthlyPlannerData: async (date) => {
    const res = await fetchMonthlyPlannerData(date.toISOString());
    set({ monthlyData: res });
  },
}));
