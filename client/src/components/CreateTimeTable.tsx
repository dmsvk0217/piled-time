import { typeLabels } from "@/const/typeLabel";
import { Category } from "@/types/category";
import { ItemMap } from "@/types/timetable";
import { Todo } from "@/types/todo";
import BaseTimeTable from "./BaseTimeTable";

interface CommonProps {
  assigningTodoId: number | null;
  todos: Todo[];
  categories: Category[];
}
export function createTimeTableComponent<K extends keyof ItemMap>(itemKey: K) {
  return function TimeTableComponent({ assigningTodoId, todos, categories }: CommonProps) {
    return (
      <BaseTimeTable<K>
        assigningTodoId={assigningTodoId}
        todos={todos}
        categories={categories}
        itemKey={itemKey}
        typeLabel={typeLabels[itemKey]} // ✅ 자동 매핑됨
      />
    );
  };
}
