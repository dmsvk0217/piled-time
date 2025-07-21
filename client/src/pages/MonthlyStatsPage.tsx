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

function getMonthStart(d: Date) {
  const date = new Date(d.getFullYear(), d.getMonth(), 1);
  return date;
}

const MonthlyStatsPage = () => {
  const [stats, setStats] = useState<StatRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const monthStart = getMonthStart(new Date());
    return monthStart.toISOString().slice(0, 10);
  });

  useEffect(() => {
    setLoading(true);
    // 월간 통계: 1일~말일까지 반복적으로 주간 API 호출 후 합산 (간단히 5번 호출, 실제 서비스는 서버에서 월간 API 제공 권장)
    const fetchAll = async () => {
      let allTodos: Todo[] = [];
      let cur = new Date(startDate);
      for (let i = 0; i < 5; i++) {
        const weekStart = new Date(cur);
        const weekStartStr = weekStart.toISOString().slice(0, 10);
        const res = await axios.get(`/api/planner/weekly?start=${weekStartStr}`);
        allTodos = allTodos.concat(res.data.todos);
        cur.setDate(cur.getDate() + 7);
        if (cur.getMonth() !== new Date(startDate).getMonth()) break;
      }
      // 카테고리별 집계
      const map: Record<string, StatRow> = {};
      allTodos.forEach((todo) => {
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
        map[cat].planMinutes += (todo.plans || []).reduce((sum, p) => sum + (p.duration || 0), 0);
        map[cat].actionMinutes += (todo.actions || []).reduce(
          (sum, a) => sum + (a.duration || 0),
          0
        );
        map[cat].totalMinutes += map[cat].planMinutes + map[cat].actionMinutes;
        map[cat].avgPercent += todo.percent ?? 0;
      });
      // 평균 달성률 계산
      Object.values(map).forEach((row) => {
        const count = allTodos.filter(
          (t) => (t.category?.name || "(미지정)") === row.category
        ).length;
        row.avgPercent = count ? Math.round(row.avgPercent / count) : 0;
      });
      setStats(Object.values(map));
      setLoading(false);
    };
    fetchAll();
  }, [startDate]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">월간 통계</h1>
      <div className="mb-4">
        <label className="mr-2 font-semibold">시작일(1일):</label>
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

export default MonthlyStatsPage;
