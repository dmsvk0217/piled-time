import { Todo } from "@/types/todo";

export type DailyData = {
  date: string;
  todos: Todo[];
};

export type WeeklyData = DailyData[];

export type monthlyData = WeeklyData[];
