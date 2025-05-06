import { Category } from "@/types/planner";
import api from "./axios";

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/api/categories");
  return res.data;
};
