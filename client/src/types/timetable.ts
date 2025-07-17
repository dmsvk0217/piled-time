import { typeLabels } from "@/const/typeLabel";
import { Action } from "@/types/action";
import { Plan } from "@/types/plan";

export type TypeLabels = typeof typeLabels;

export type ItemMap = {
  actions: Action;
  plans: Plan;
};

export type AssignHandler = (
  todoId: number,
  startAt: Date,
  duration: number,
  resetDrag: () => void
) => void;
