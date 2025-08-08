import { useWeeklyStatsStore } from "@/stores/useWeeklyStatsStore";
import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

export default function CategoryStats() {
  const weeklyData = useWeeklyStatsStore((s) => s.weeklyData);

  const { categoryStats, maxDuration } = useMemo(() => {
    const categoryMap: Record<
      string,
      {
        name: string;
        color: string;
        totalPlan: number;
        totalAction: number;
        percentSum: number;
        count: number;
        dailyTrend: { day: string; value: number; count: number }[];
      }
    > = {};

    let max = 0;

    for (const day of weeklyData) {
      const dayLabel = DAY_LABELS[new Date(day.date).getDay()];
      for (const todo of day.todos) {
        const { category, plan, action, percent } = todo;

        if (!categoryMap[category.name]) {
          categoryMap[category.name] = {
            name: category.name,
            color: category.color,
            totalPlan: 0,
            totalAction: 0,
            percentSum: 0,
            count: 0,
            dailyTrend: DAY_LABELS.map((d) => ({ day: d, value: 0, count: 0 })),
          };
        }

        const stat = categoryMap[category.name];
        const planDuration = plan?.duration || 0;
        const actionDuration = action?.duration || 0;

        stat.totalPlan += planDuration;
        stat.totalAction += actionDuration;
        stat.percentSum += percent;
        stat.count += 1;

        const trend = stat.dailyTrend.find((d) => d.day === dayLabel);
        if (trend) {
          trend.value += planDuration;
          trend.count += 1;
          if (trend.value > max) max = trend.value;
        }
      }
    }

    const finalStats = Object.values(categoryMap).map((cat) => ({
      ...cat,
      averagePercent: cat.count > 0 ? Math.round(cat.percentSum / cat.count) : 0,
      dailyCountLabel: cat.dailyTrend
        .filter((d) => d.count > 0)
        .map((d) => `${d.day}(${d.count})`)
        .join(", "),
    }));

    return {
      categoryStats: finalStats,
      maxDuration: Math.ceil(max / 60) * 60,
    };
  }, [weeklyData]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categoryStats.length === 0 ? (
        <p className="text-center text-gray-500 py-6 text-sm col-span-2">
          이번 주 카테고리별 통계가 없습니다.
        </p>
      ) : (
        categoryStats.map((cat) => (
          <div key={cat.name} className="p-4 border rounded-lg bg-white shadow-sm">
            <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
            </h4>
            <p className="text-sm text-gray-700 mb-1">
              총 계획 / 실행 시간:{" "}
              <b>
                {Math.floor(cat.totalPlan / 60)}h {cat.totalPlan % 60}m
              </b>{" "}
              /{" "}
              <b>
                {Math.floor(cat.totalAction / 60)}h {cat.totalAction % 60}m
              </b>
            </p>

            <p className="text-sm text-gray-700 mb-1">
              평균 달성률: <b>{cat.averagePercent}%</b>
            </p>

            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={cat.dailyTrend}>
                <XAxis
                  dataKey="day"
                  tickFormatter={(day: string) => {
                    const trend = cat.dailyTrend.find((d) => d.day === day);
                    return trend?.count ? `${day} (${trend.count})` : day;
                  }}
                />

                <YAxis domain={[0, maxDuration]} />
                <Tooltip formatter={(v) => `${v}분`} />
                <Bar dataKey="value" fill={cat.color} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))
      )}
    </div>
  );
}
