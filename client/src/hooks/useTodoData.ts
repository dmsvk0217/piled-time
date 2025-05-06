import { fetchCategories } from "@/api/categoryApi";
import { fetchDailyPlanner } from "@/api/plannerApi";
import { Category, Todo } from "@/types/planner";
import { useEffect, useState } from "react";

export function useTodoData() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const { todos } = await fetchDailyPlanner(today);
      const data = await fetchCategories();
      setTodos(todos);
      setCategories(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { todos, categories, error, isLoading, fetchData };
}
