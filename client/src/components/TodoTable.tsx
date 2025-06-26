import { createTodo } from "@/api/todoApi";
import TodoTableBody from "@/components/TodoTableBody";
import TodoTableHead from "@/components/TodoTableHead";
import { Category, Todo } from "@/types/planner";
import { useState } from "react";

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
  // 등록 폼 상태
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 0);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="overflow-x-auto" style={{ minWidth: 320, maxWidth: 700, width: "100%" }}>
      {/* 등록 폼 */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 items-end">
        <div>
          <label className="block text-xs mb-1">카테고리</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="border px-2 py-1 rounded">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
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
          <col style={{ width: "28%" }} /> {/* 카테고리 */}
          <col style={{ width: 40 }} /> {/* 배치(체크박스) */}
          <col style={{ width: "42%" }} /> {/* 세부내용 */}
          <col style={{ width: "20%" }} /> {/* 달성률 */}
        </colgroup>
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
