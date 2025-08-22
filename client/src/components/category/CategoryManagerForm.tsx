import api from "@/api/axiosApi";
import { useCategoryStore } from "@/stores/useCatgoryStore";
import { useHomePageStore } from "@/stores/useHomePageStore";
import { useTodoStore } from "@/stores/useTodoStore";
import { Category } from "@/types/category";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";
import CategoryColorBox from "./CategoryColorBox";

export default function CategoryManagerForm() {
  const { categories, fetchCategories } = useCategoryStore();
  const date = useHomePageStore((s) => s.date);
  const fetchTododetails = useTodoStore((s) => s.fetchTododetails);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [colorPicker, setColorPicker] = useState("#000000");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const resetForm = () => {
    setEditCategoryId(null);
    setEditCategoryName("");
    setNewCategoryName("");
    setColorPicker("#000000");
  };

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    await api.post("/api/categories", {
      name: newCategoryName,
      color: colorPicker,
    });
    resetForm();
    await fetchCategories();
  };

  const startEdit = (cat: Category) => {
    setEditCategoryId(cat.id);
    setEditCategoryName(cat.name);
    setColorPicker(cat.color);
  };

  const updateCategory = async (id: number) => {
    await api.patch(`/api/categories/${id}`, { name: editCategoryName, color: colorPicker });
    resetForm();
    await fetchCategories();
    await fetchTododetails(date);
  };

  const deleteCategory = async (id: number) => {
    try {
      await api.delete(`/api/categories/${id}`);
      toast.success("카테고리가 삭제되었습니다.");
      await fetchCategories();
    } catch (error: any) {
      const message = error?.response?.data?.errors?.[0]?.message;
      if (message) {
        toast.error(message);
      } else {
        toast.error("카테고리 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="카테고리 이름"
          className="border px-3 py-1 rounded w-full"
          value={editCategoryId ? editCategoryName : newCategoryName}
          onChange={(e) =>
            editCategoryId
              ? setEditCategoryName(e.target.value)
              : setNewCategoryName(e.target.value)
          }
        />
        <HexColorPicker color={colorPicker} onChange={setColorPicker} />
        <CategoryColorBox color={colorPicker} />
        {editCategoryId ? (
          <div className="flex gap-2">
            <button
              onClick={() => updateCategory(editCategoryId)}
              className="bg-green-500 text-white px-3 py-1 rounded w-full mt-2">
              저장
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-3 py-1 rounded w-full mt-2">
              취소
            </button>
          </div>
        ) : (
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white px-3 py-1 rounded w-full mt-2">
            추가
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center gap-3">
            <CategoryColorBox color={cat.color} />

            {editCategoryId === cat.id ? null : (
              <>
                <span>{cat.name}</span>
                <button onClick={() => startEdit(cat)} className="text-blue-600">
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
