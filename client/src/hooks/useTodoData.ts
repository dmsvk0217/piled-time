import { fetchDailyPlanner } from "@/api/plannerApi";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

export function useTodoDetail(date: string) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (targetDate?: string) => {
    try {
      const queryDate = targetDate || date;
      const { todos } = await fetchDailyPlanner(queryDate);
      setTodos(todos);
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
  }, [date]);

  return { todos, error, isLoading, fetchData };
}
