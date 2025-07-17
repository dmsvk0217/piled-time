import { typeLabels } from "@/const/typeLabel";
import { Category } from "@/types/category";
import { AssignHandler, ItemMap } from "@/types/timetable";
import { Todo } from "@/types/todo";
import BaseTimeTable from "./BaseTimeTable";

interface CommonProps {
  assigningTodoId: number | null;
  onAssign: AssignHandler;
  todos: Todo[];
  categories: Category[];
}
export function createTimeTableComponent<K extends keyof ItemMap>(itemKey: K) {
  return function TimeTableComponent({
    assigningTodoId,
    onAssign,
    todos,
    categories,
  }: CommonProps) {
    return (
      <BaseTimeTable<K>
        assigningTodoId={assigningTodoId}
        onAssign={onAssign}
        todos={todos}
        categories={categories}
        itemKey={itemKey}
        typeLabel={typeLabels[itemKey]} // ✅ 자동 매핑됨
      />
    );
  };
}
