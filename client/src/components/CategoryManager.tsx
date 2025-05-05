import api from "@/api/axios";
import { Category } from "@/types/planner";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import CategoryColorBox from "./CategoryColorBox";

interface Props {
  categories: Category[];
  fetchData: () => Promise<void>;
}

export default function CategoryManager({ categories, fetchData }: Props) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#000000");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    await api.post("/api/categories", {
      name: newCategoryName,
      color: newCategoryColor,
    });
    setNewCategoryName("");
    setNewCategoryColor("#000000");
    await fetchData();
  };

  const updateCategory = async (id: number) => {
    await api.patch(`/api/categories/${id}`, { name: editCategoryName });
    setEditCategoryId(null);
    setEditCategoryName("");
    await fetchData();
  };

  const deleteCategory = async (id: number) => {
    await api.delete(`/api/categories/${id}`);
    await fetchData();
  };

  return (
    <div>
      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="카테고리 이름"
          className="border px-3 py-1 rounded w-full"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <HexColorPicker color={newCategoryColor} onChange={setNewCategoryColor} />
        <CategoryColorBox color={newCategoryColor} />
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-3 py-1 rounded w-full mt-2">
          추가
        </button>
      </div>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center gap-3">
            <CategoryColorBox color={cat.color} />

            {editCategoryId === cat.id ? (
              <>
                <input
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <button onClick={() => updateCategory(cat.id)} className="text-green-600">
                  저장
                </button>
                <button onClick={() => setEditCategoryId(null)} className="text-gray-500">
                  취소
                </button>
              </>
            ) : (
              <>
                <span>{cat.name}</span>
                <button
                  onClick={() => {
                    setEditCategoryId(cat.id);
                    setEditCategoryName(cat.name);
                  }}
                  className="text-blue-600">
                  수정
                </button>
              </>
            )}
            <button onClick={() => deleteCategory(cat.id)} className="text-red-500">
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
