import { fetchCategories } from "@/api/categoryApi";
import { Category } from "@/types/category";
import { create } from "zustand";

interface CategoryState {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  fetchCategories: async () => {
    const categories = await fetchCategories();
    set({ categories });
  },
}));
