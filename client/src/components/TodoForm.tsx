import { useCategoryStore } from "@/stores/catgory";
import { useEffect, useState } from "react";

interface TodoFormProps {
  onSubmit: (categoryId: number, content: string) => Promise<void>;
  loading: boolean;
}

export default function TodoForm({ onSubmit, loading }: TodoFormProps) {
  const categories = useCategoryStore((s) => s.categories);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId || !content) return;
    await onSubmit(categoryId, content);
    setContent("");
  };

  return (
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
  );
}
