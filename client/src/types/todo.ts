import { Action } from "@/types/action";
import { Category } from "@/types/category";
import { Plan } from "@/types/plan";

export interface Todo {
  id: number;
  content: string;
  category: Category;
  actions: Action[];
  plans: Plan[];
  createdAt: string;
  updatedAt: string;
}
