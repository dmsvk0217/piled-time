import { DailyPlannerResponse } from "@/types/daily-planner";
import api from "./axios";

export const fetchDailyPlanner = async (date: string): Promise<DailyPlannerResponse> => {
  const res = await api.get<DailyPlannerResponse>("/api/planner/daily", {
    params: { date },
  });
  return res.data;
};
