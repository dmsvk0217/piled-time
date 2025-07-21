import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import axios from "../api/axios";

interface StatRow {
  category: string;
  totalMinutes: number;
  avgPercent: number;
  actionMinutes: number;
  planMinutes: number;
}

function getMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

const WeeklyStatsPage = () => {
  const [stats, setStats] = useState<StatRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const monday = getMonday(new Date());
    return monday.toISOString().slice(0, 10);
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/planner/weekly?start=${startDate}`)
      .then((res) => {
        const todos: Todo[] = res.data.todos;
        // 카테고리별 집계
        const map: Record<string, StatRow> = {};
        todos.forEach((todo) => {
          const cat = todo.category?.name || "(미지정)";
          if (!map[cat]) {
            map[cat] = {
              category: cat,
              totalMinutes: 0,
              avgPercent: 0,
              actionMinutes: 0,
              planMinutes: 0,
            };
          }
          // plan/action 시간 합산
          map[cat].planMinutes += (todo.plans || []).reduce((sum, p) => sum + (p.duration || 0), 0);
          map[cat].actionMinutes += (todo.actions || []).reduce(
            (sum, a) => sum + (a.duration || 0),
            0
          );
          // 전체 시간(플랜+액션)
          map[cat].totalMinutes += map[cat].planMinutes + map[cat].actionMinutes;
          // 달성률
          map[cat].avgPercent += todo.percent ?? 0;
        });
        // 평균 달성률 계산
        Object.values(map).forEach((row) => {
          const count = todos.filter(
            (t) => (t.category?.name || "(미지정)") === row.category
          ).length;
          row.avgPercent = count ? Math.round(row.avgPercent / count) : 0;
        });
        setStats(Object.values(map));
      })
      .finally(() => setLoading(false));
  }, [startDate]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">주간 통계</h1>
      <div className="mb-4">
        <label className="mr-2 font-semibold">시작일(월요일):</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">카테고리별 시간 및 달성률</h2>
        {loading ? (
          <div>로딩 중...</div>
        ) : (
          <table className="w-full text-center border">
            <thead>
              <tr>
                <th className="border">카테고리</th>
                <th className="border">총 시간(분)</th>
                <th className="border">평균 달성률(%)</th>
                <th className="border">Plan 시간(분)</th>
                <th className="border">Action 시간(분)</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((row) => (
                <tr key={row.category}>
                  <td className="border px-2 py-1">{row.category}</td>
                  <td className="border px-2 py-1">{row.totalMinutes}</td>
                  <td className="border px-2 py-1">{row.avgPercent}</td>
                  <td className="border px-2 py-1">{row.planMinutes}</td>
                  <td className="border px-2 py-1">{row.actionMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WeeklyStatsPage;
