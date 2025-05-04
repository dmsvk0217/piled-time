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
      <h1 className="text-2xl font-bold mb-4 text-center">📅 오늘의 플래너</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center">{error}</div>}

      {isLoading ? (
        <p className="text-gray-500 text-center">불러오는 중...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-500 text-center">오늘 등록된 할 일이 없습니다.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-400 text-sm text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-4 py-2">카테고리</th>
                <th className="border border-gray-400 px-4 py-2">배치</th>
                <th className="border border-gray-400 px-4 py-2">세부내용</th>
                <th className="border border-gray-400 px-4 py-2">달성률</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => {
                const totalPlanned = todo.plans.reduce((sum, p) => sum + p.duration, 0);
                const totalDone = todo.actions.reduce((sum, a) => sum + a.duration, 0);
                const percent =
                  totalPlanned > 0 ? Math.min((totalDone / totalPlanned) * 100, 100) : 0;

                return (
                  <tr key={todo.id}>
                    <td className="border border-gray-400 px-4 py-2">{todo.category.name}</td>
                    <td className="border border-gray-400 px-4 py-2">✅</td>
                    <td className="border border-gray-400 px-4 py-2">
                      <div>{todo.content}</div>
                      {todo.plans.length > 0 && (
                        <div className="text-gray-500 text-xs mt-1">
                          ({todo.plans.map((p) => `${p.duration}m`).join(", ")})
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <div className="w-full bg-gray-200 h-4 rounded">
                        <div
                          className="bg-gray-700 h-4 rounded"
                          style={{ width: `${percent}%` }}></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
