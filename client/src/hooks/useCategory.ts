import { fetchCategories } from "@/api/categoryApi";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";

export function useCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategory = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("카테고리 데이터를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return { categories, error, isLoading, fetchCategory };
}
