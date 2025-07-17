import { createTodo, deleteTodo, updateTodo } from "@/api/todoApi";
import TodoTableBody from "@/components/TodoTableBody";
import TodoTableHead from "@/components/TodoTableHead";
import { Category } from "@/types/category";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

interface TodoTableProps {
  todos: Todo[];
  categories: Category[];
  fetchData: () => Promise<void>;
  date: string;
  assigningActionTodoId: number | null;
  setAssigningActionTodo: (id: number | null) => void;
  assigningPlanTodoId: number | null;
  setAssigningPlanTodo: (id: number | null) => void;
}

export default function TodoTable({
  todos,
  categories,
  fetchData,
  date,
  assigningActionTodoId,
  setAssigningActionTodo,
  assigningPlanTodoId,
  setAssigningPlanTodo,
}: TodoTableProps) {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId || !content) return;
    setLoading(true);
    try {
      await createTodo(categoryId, date, content);
      setContent("");
      await fetchData();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (todo: Todo, data: Partial<Todo>) => {
    setLoading(true);
    try {
      await updateTodo(todo.id, data);
      await fetchData();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (todo: Todo) => {
    setLoading(true);
    try {
      await deleteTodo(todo.id);
      await fetchData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto min-w-[600px] max-w-[700px] w-full">
      {/* 등록 폼 */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 items-end">
        <div>
          <label className="block text-xs mb-1">카테고리</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="border px-2 py-1 rounded">
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} style={{ color: cat.color }}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">내용</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border px-2 py-1 rounded w-60"
            placeholder="할 일 내용을 입력하세요"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading || !content}>
          {loading ? "등록 중..." : "할 일 등록"}
        </button>
      </form>
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
        <TodoTableHead categories={categories} fetchData={fetchData} />
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
