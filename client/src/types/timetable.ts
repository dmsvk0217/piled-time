import { Action } from "@/types/action";
import { Plan } from "@/types/plan";
import { Todo } from "@/types/todo";

export type TimeTableEntry = {
  todoDetail: Todo;
  entry: Action | Plan;
};
