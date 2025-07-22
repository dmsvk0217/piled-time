import { createTodo, deleteTodo, updateTodo } from "@/api/todoApi";
import TodoForm from "@/components/TodoForm";
import TodoTableBody from "@/components/TodoTableBody";
import TodoTableHead from "@/components/TodoTableHead";
import { Category } from "@/types/category";
import { Todo } from "@/types/todo";
import { useState } from "react";

interface TodoTableProps {
  date: string;
  todos: Todo[];
  fetchTodoDetail: () => Promise<void>;
  categories: Category[];
  fetchCategory: () => Promise<void>;
  assigningActionTodoId: number | null;
  setAssigningActionTodo: (id: number | null) => void;
  assigningPlanTodoId: number | null;
  setAssigningPlanTodo: (id: number | null) => void;
}

export default function TodoTable({
  date,
  todos,
  fetchTodoDetail,
  categories,
  fetchCategory,
  assigningActionTodoId,
  setAssigningActionTodo,
  assigningPlanTodoId,
  setAssigningPlanTodo,
}: TodoTableProps) {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (categoryId: number, content: string) => {
    setLoading(true);
    try {
      await createTodo(categoryId, date, content);
      await fetchTodoDetail();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (todo: Todo, data: Partial<Todo>) => {
    setLoading(true);
    try {
      await updateTodo(todo.id, data);
      await fetchTodoDetail();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (todo: Todo) => {
    setLoading(true);
    try {
      await deleteTodo(todo.id);
      await fetchTodoDetail();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto min-w-[600px] max-w-[700px] w-full">
      {/* 등록 폼 */}
      <TodoForm categories={categories} onSubmit={handleFormSubmit} loading={loading} />
      {/* 기존 테이블 */}
      <table
        className="min-w-full border border-gray-400 text-sm text-center"
        style={{ tableLayout: "fixed", width: "100%" }}>
        <colgroup>
          <col style={{ width: "25%" }} />
          {/* 카테고리 */}
          <col style={{ width: "14%" }} />
          {/* 배치(체크박스) */}
          <col style={{ width: "50%" }} />
          {/* 세부내용 */}
          <col style={{ width: "16%" }} />
          {/* 달성률 */}
          <col style={{ width: "26%" }} />
          {/* 수정/삭제/배치 */}
        </colgroup>
        <TodoTableHead categories={categories} fetchCategory={fetchCategory} />
        <TodoTableBody
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          assigningActionTodoId={assigningActionTodoId}
          setAssigningActionTodo={setAssigningActionTodo}
          assigningPlanTodoId={assigningPlanTodoId}
          setAssigningPlanTodo={setAssigningPlanTodo}
        />
      </table>
    </div>
  );
}
