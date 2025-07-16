import { fetchCategories } from "@/api/categoryApi";
import { fetchDailyPlanner } from "@/api/plannerApi";
import { Category } from "@/types/category";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

export function useTodoData(date: string) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (targetDate?: string) => {
    try {
      const queryDate = targetDate || date;
      const { todos } = await fetchDailyPlanner(queryDate);
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
    fetchData(date);
    // eslint-disable-next-line
  }, [date]);

  return { todos, categories, error, isLoading, fetchData };
}
