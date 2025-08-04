import { useWeeklyStatsStore } from "@/stores/useWeeklyStatsStore";
import { DailyData } from "@/types/stats.type";
import { Todo } from "@/types/todo";
import { useState } from "react";

type SortKey = "date" | "category" | "content" | "plan" | "action" | "percent";
type SortOrder = "asc" | "desc";

export default function TodoSummaryTable() {
  const weeklyData = useWeeklyStatsStore((s) => s.weeklyData);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const todos: Todo[] = weeklyData.flatMap((day: DailyData) => day.todos);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    const getValue = (todo: Todo): string | number => {
      switch (sortKey) {
        case "date":
          return todo.date;
        case "category":
          return todo.category.name;
        case "content":
          return todo.content;
        case "plan":
          return todo.plan?.duration || 0;
        case "action":
          return todo.action?.duration || 0;
        case "percent":
          return todo.percent;
        default:
          return 0;
      }
    };

    if (!sortKey) return 0;

    const aVal = getValue(a);
    const bVal = getValue(b);

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return "↕";
    return sortOrder === "asc" ? "▲" : "▼";
  };

  return (
    <div className="overflow-auto rounded border border-gray-200">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 cursor-pointer select-none" onClick={() => handleSort("date")}>
              날짜 {renderSortIcon("date")}
            </th>
            <th
              className="px-4 py-2 cursor-pointer select-none"
              onClick={() => handleSort("category")}>
              카테고리 {renderSortIcon("category")}
            </th>
            <th
              className="px-4 py-2 cursor-pointer select-none"
              onClick={() => handleSort("content")}>
              내용 {renderSortIcon("content")}
            </th>
            <th className="px-4 py-2 cursor-pointer select-none" onClick={() => handleSort("plan")}>
              계획 시간 {renderSortIcon("plan")}
            </th>
            <th
              className="px-4 py-2 cursor-pointer select-none"
              onClick={() => handleSort("action")}>
              실행 시간 {renderSortIcon("action")}
            </th>
            <th
              className="px-4 py-2 cursor-pointer select-none"
              onClick={() => handleSort("percent")}>
              달성률 {renderSortIcon("percent")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTodos.map((todo) => {
            const planMin = todo.plan?.duration || 0;
            const actionMin = todo.action?.duration || 0;
            return (
              <tr key={todo.id} className="border-t">
                <td className="px-4 py-2">{todo.date.slice(5, 10).replace("-", "/")}</td>
                <td className="px-4 py-2">{todo.category.name}</td>
                <td className="px-4 py-2">{todo.content}</td>
                <td className="px-4 py-2">
                  {Math.floor(planMin / 60)}h {planMin % 60}m
                </td>
                <td className="px-4 py-2">
                  {Math.floor(actionMin / 60)}h {actionMin % 60}m
                </td>
                <td
                  className={` px-4 py-2 w-full h-6 rounded flex items-center justify-center select-none border
                    ${todo.percent === 0 ? "bg-white text-gray-800" : ""}
                    ${todo.percent === 25 ? "bg-gray-100 text-gray-800" : ""}
                    ${todo.percent === 50 ? "bg-gray-300 text-gray-800" : ""}
                    ${todo.percent === 75 ? "bg-gray-500 text-white" : ""}
                    ${todo.percent === 100 ? "bg-gray-700 text-white" : ""}
                  `}>
                  {todo.percent}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
