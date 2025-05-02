import { fetchDailyPlanner } from "@/api/plannerApi";
import { Todo } from "@/types/planner";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
        const { todos } = await fetchDailyPlanner(today);
        setTodos(todos);
        setError(null); // 성공 시 에러 초기화
      } catch (err) {
        console.error("플래너 데이터를 가져오지 못했습니다:", err);
        setError("데이터를 불러오는 데 실패했습니다. 새로고침하거나 나중에 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">📅 오늘의 플래너</h1>

      {/* 에러 메시지 출력 */}
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

      {/* 로딩 상태 표시 */}
      {isLoading ? (
        <p className="text-gray-500">불러오는 중...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-500">오늘 등록된 할 일이 없습니다.</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} className="mb-6 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">📝 {todo.content}</h2>
            <p className="text-sm text-gray-600">
              카테고리: <span style={{ color: todo.category.color }}>{todo.category.name}</span>
            </p>

            {/* Actions */}
            <div className="mt-2">
              <h3 className="font-medium">✅ 수행 기록</h3>
              {todo.actions.length > 0 ? (
                <ul className="list-disc ml-4">
                  {todo.actions.map((action) => (
                    <li key={action.id}>
                      {action.startAt} - {action.duration}분
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">수행 기록 없음</p>
              )}
            </div>

            {/* Plans */}
            <div className="mt-2">
              <h3 className="font-medium">🗓️ 계획</h3>
              {todo.plans.length > 0 ? (
                <ul className="list-disc ml-4">
                  {todo.plans.map((plan) => (
                    <li key={plan.id}>
                      {plan.startAt} - {plan.duration}분
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">계획 없음</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
