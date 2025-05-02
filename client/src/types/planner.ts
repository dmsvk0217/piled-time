// src/types/planner.ts

export interface Category {
  id: number;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Action {
  id: number;
  startAt: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Plan {
  id: number;
  startAt: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Todo {
  id: number;
  date: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  category: Category;
  actions: Action[];
  plans: Plan[];
}

export interface DailyPlannerResponse {
  todos: Todo[];
}
