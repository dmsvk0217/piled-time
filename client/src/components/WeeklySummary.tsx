export interface WeeklySummaryProps {
  averageProgress: number; // 0 ~ 100
  totalPlannedTimeText: string; // 1시간 30분
  totalActionTimeText: string; // 1시간 30분
  completedTodos: number;
  totalTodos: number;
  topCategory: string;
}
export default function WeeklySummary({
  averageProgress,
  totalPlannedTimeText,
  totalActionTimeText,
  completedTodos,
  totalTodos,
  topCategory,
}: WeeklySummaryProps) {
  return (
    <div className="flex flex-col gap-1">
      {/* 평균 달성률 */}
      <div className="rounded-lg bg-gray-100 p-3 shadow-sm">
        <h3 className="text-sm font-medium mb-1">📊 평균 달성률</h3>
        <p className="text-lg font-semibold text-blue-600">{averageProgress}%</p>
        <div className="h-2 bg-gray-300 rounded mt-2">
          <div
            className="h-full bg-blue-500 rounded transition-all"
            style={{ width: `${averageProgress}%` }}></div>
        </div>
      </div>

      {/* 계획/실행 시간 */}
      <div className="rounded-lg bg-gray-100 p-3 shadow-sm">
        <h3 className="text-sm font-medium mb-1">⏱️ 계획 / 실행</h3>
        <p className="text-sm text-gray-800">
          {totalPlannedTimeText} / {totalActionTimeText}
        </p>
      </div>

      {/* 완료된 할 일 */}
      <div className="rounded-lg bg-gray-100 p-3 shadow-sm">
        <h3 className="text-sm font-medium mb-1">✅ 완료한 할 일</h3>
        <p className="text-sm text-gray-800">
          {completedTodos} / {totalTodos}
        </p>
      </div>

      {/* 최다 활동 카테고리 */}
      <div className="rounded-lg bg-gray-100 p-3 shadow-sm">
        <h3 className="text-sm font-medium mb-1">🏷️ 최다 활동 카테고리</h3>
        <p className="text-sm font-semibold text-gray-800">{topCategory}</p>
      </div>
    </div>
  );
}
