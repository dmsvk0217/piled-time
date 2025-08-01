import { createTodo, deleteTodo, updateTodo } from "@/api/todo";
import TodoForm from "@/components/TodoForm";
import TodoTableBody from "@/components/TodoTableBody";
import TodoTableHead from "@/components/TodoTableHead";
import { useTodoStore } from "@/stores/todo";
import { useHomePageStore } from "@/stores/useHomePageStore";
import { Todo } from "@/types/todo";
import { useState } from "react";

export default function TodoTable() {
  const [loading, setLoading] = useState(false);

  const date = useHomePageStore((s) => s.date);
  const fetchTododetail = useTodoStore((s) => s.fetchTododetails);

  const handleFormSubmit = async (categoryId: number, content: string) => {
    setLoading(true);
    try {
      await createTodo(categoryId, date, content);
      await fetchTododetail(date);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (todo: Todo, data: Partial<Todo>) => {
    setLoading(true);
    try {
      await updateTodo(todo.id, data);
      await fetchTododetail(date);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (todo: Todo) => {
    setLoading(true);
    try {
      await deleteTodo(todo.id);
      await fetchTododetail(date);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto min-w-[600px] max-w-[700px] min-h-[400px] w-full">
      {/* 등록 폼 */}
      <TodoForm onSubmit={handleFormSubmit} loading={loading} />
      {/* 기존 테이블 */}
      <table
        className="min-w-full border border-gray-400 text-sm text-center"
        style={{ tableLayout: "fixed", width: "100%" }}>
        <colgroup>
          <col style={{ width: "25%" }} />
          {/* 카테고리 */}
          <col style={{ width: "50%" }} />
          {/* 배치(체크박스) */}
          <col style={{ width: "14%" }} />
          {/* 세부내용 */}
          <col style={{ width: "16%" }} />
          {/* 달성률 */}
          <col style={{ width: "26%" }} />
          {/* 수정/삭제/배치 */}
        </colgroup>
        <TodoTableHead />
        <TodoTableBody onUpdate={handleUpdate} onDelete={handleDelete} />
      </table>
    </div>
  );
}
