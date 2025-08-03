import { WeeklyData } from "@/types/stats.type";
import api from "./axiosApi";

export const fetchWeeklyPlannerData = async (date: string): Promise<WeeklyData> => {
  const res = await api.get<WeeklyData>("/api/planner/weekly", {
    params: { date },
  });
  return res.data;
};
