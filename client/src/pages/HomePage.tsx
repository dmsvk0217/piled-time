import api from "@/api/axios";
import { fetchDailyPlanner } from "@/api/plannerApi";
import CategoryManager from "@/components/CategoryManager";
import { Category, Todo } from "@/types/planner";
import * as Dialog from "@radix-ui/react-dialog";
import { Settings2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [manualPercents, setManualPercents] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const { todos } = await fetchDailyPlanner(today);
      const res = await api.get("/api/categories");
      setTodos(todos);
      setCategories(res.data);
      setError(null);
    } catch (err) {
      console.error("플래너 데이터를 가져오지 못했습니다:", err);
      setError("데이터를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">📅 오늘의 플래너</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center">{error}</div>}
      {isLoading && <p className="text-center text-gray-500">불러오는 중...</p>}

      {!isLoading &&
        !error &&
        (todos.length === 0 ? (
          <p className="text-center text-gray-500">오늘 등록된 할 일이 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-400 text-sm text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      카테고리
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <button className="hover:text-blue-500">
                            <Settings2 size={16} />
                          </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-md">
                            <Dialog.Title className="text-lg font-bold mb-4">
                              카테고리 관리
                            </Dialog.Title>
                            <CategoryManager categories={categories} fetchData={fetchData} />
                            <Dialog.Close className="absolute top-2 right-2 text-gray-500 hover:text-black">
                              ✕
                            </Dialog.Close>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                    </div>
                  </th>
                  <th className="border px-4 py-2">배치</th>
                  <th className="border px-4 py-2">세부내용</th>
                  <th className="border px-4 py-2">달성률 (%)</th>
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
                      <td className="border px-4 py-2">{todo.category.name}</td>
                      <td className="border px-4 py-2">✅</td>
                      <td className="border px-4 py-2">
                        <div>{todo.content}</div>
                        {todo.plans.length > 0 && (
                          <div className="text-gray-500 text-xs mt-1">
                            ({todo.plans.map((p) => `${p.duration}m`).join(", ")})
                          </div>
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        <div className="w-full bg-gray-200 h-4 rounded mb-1">
                          <div
                            className="bg-gray-700 h-4 rounded"
                            style={{ width: `${manualPercents[todo.id] ?? percent}%` }}></div>
                        </div>
                        <input
                          type="number"
                          className="border w-16 text-center"
                          min={0}
                          max={100}
                          value={manualPercents[todo.id] ?? Math.round(percent)}
                          onChange={(e) =>
                            setManualPercents({
                              ...manualPercents,
                              [todo.id]: Math.min(100, Math.max(0, Number(e.target.value))),
                            })
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
