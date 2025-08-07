import { useWeeklyStatsStore } from "@/stores/useWeeklyStatsStore";
import { DailyData } from "@/types/stats.type";
import { Todo } from "@/types/todo";

export default function WeeklySummary() {
  const weeklyData = useWeeklyStatsStore((s) => s.weeklyData);

  const allTodos: Todo[] = weeklyData.flatMap((day: DailyData) => day.todos);

  const totalTodos = allTodos.length;
  const completedTodos = allTodos.filter((todo) => todo.percent >= 100).length;
  const averageProgress = totalTodos
    ? Math.round(allTodos.reduce((sum, t) => sum + t.percent, 0) / totalTodos)
    : 0;

  const totalPlannedMinutes = allTodos.reduce((sum, t) => sum + (t.plan?.duration || 0), 0);
  const totalActionMinutes = allTodos.reduce((sum, t) => sum + (t.action?.duration || 0), 0);

  const totalPlannedTimeText = `${Math.floor(totalPlannedMinutes / 60)}h ${
    totalPlannedMinutes % 60
  }m`;
  const totalActionTimeText = `${Math.floor(totalActionMinutes / 60)}h ${totalActionMinutes % 60}m`;

  const categoryCount: Record<string, number> = {};
  for (const t of allTodos) {
    const name = t.category?.name;
    if (name) categoryCount[name] = (categoryCount[name] || 0) + 1;
  }
  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        {/* 평균 달성률 */}
        <div className="w-1/2 rounded-lg bg-gray-100 p-2 shadow-sm">
          <h3 className="text-sm font-medium mb-1">평균 달성률</h3>
          <div className="flex gap-2 items-center">
            <div className="w-1/5 text-lg font-semibold text-blue-600">{averageProgress}%</div>
            <div className="w-4/5 h-2 bg-gray-300 rounded">
              <div
                className=" h-full bg-blue-500 rounded transition-all"
                style={{ width: `${averageProgress}%` }}></div>
            </div>
          </div>
        </div>
        {/* 계획/실행 시간 */}
        <div className="w-1/2 rounded-lg bg-gray-100 p-2 shadow-sm">
          <h3 className="text-sm font-medium mb-1">⏱️ 계획 / 실행</h3>
          <p className="text-sm text-gray-800">
            {totalPlannedTimeText} / {totalActionTimeText}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        {/* 완료된 할 일 */}
        <div className="w-1/2 rounded-lg bg-gray-100 p-2 shadow-sm">
          <h3 className="text-sm font-medium mb-1">✅ 완료한 할 일</h3>
          <p className="text-sm text-gray-800">
            {completedTodos} / {totalTodos}
          </p>
        </div>

        {/* 최다 활동 카테고리 */}
        <div className="w-1/2 rounded-lg bg-gray-100 p-2 shadow-sm">
          <h3 className="text-sm font-medium mb-1">🏷️ 최다 활동 카테고리</h3>
          <p className="text-sm font-semibold text-gray-800">{topCategory}</p>
        </div>
      </div>
    </div>
  );
}
