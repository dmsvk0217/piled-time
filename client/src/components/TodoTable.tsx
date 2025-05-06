import TodoTableBody from "@/components/TodoTableBody";
import TodoTableHead from "@/components/TodoTableHead";
import { Category, Todo } from "@/types/planner";

interface TodoTableProps {
  todos: Todo[];
  categories: Category[];
  manualPercents: { [key: string]: number };
  setManualPercents: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  fetchData: () => Promise<void>;
}

export default function TodoTable({
  todos,
  categories,
  manualPercents,
  setManualPercents,
  fetchData,
}: TodoTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-400 text-sm text-center">
        <TodoTableHead categories={categories} fetchData={fetchData} />
        <TodoTableBody
          todos={todos}
          manualPercents={manualPercents}
          setManualPercents={setManualPercents}
        />
      </table>
    </div>
  );
}
