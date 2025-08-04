import FeedbackBox from "@/components/FeedbackBox";
import CategoryStats from "@/components/stats/CategoryStats";
import TodoSummaryTable from "@/components/stats/TodoSummaryTable";
import WeeklyDailyFeedbackList from "@/components/stats/WeeklyDailyFeedbackList";
import WeeklySelector from "@/components/stats/WeeklySelector";
import WeeklyTimeTable from "@/components/stats/WeeklyTimeTable";
import WeeklySummary from "@/components/WeeklySummary";
import { useWeeklyStatsStore } from "@/stores/useWeeklyStatsStore";
import { FeedbackType } from "@/types/feedback";
import { DailyData } from "@/types/stats.type";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

const WeeklyStatsPage = () => {
  const date = useWeeklyStatsStore((s) => s.date);
  const weeklyData = useWeeklyStatsStore((s) => s.weeklyData);
  const fetchWeeklyPlannerData = useWeeklyStatsStore((s) => s.fetchWeeklyPlannerData);

  const [loading, setLoading] = useState(true);
  const [timeTableData, setTimeTableData] = useState<{
    plan: Record<string, number[]>;
    action: Record<string, number[]>;
  }>({
    plan: {},
    action: {},
  });
  const [categoryStats, setCategoryStats] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchWeeklyPlannerData(date);

        const allTodos: Todo[] = weeklyData.flatMap((day: DailyData) => day.todos);

        // 시간표 생성
        const emptySlots = () => new Array(48).fill(0);

        const plan: Record<string, number[]> = {};
        const action: Record<string, number[]> = {};

        for (const { date } of weeklyData) {
          plan[date] = emptySlots();
          action[date] = emptySlots();
        }

        for (const todo of allTodos) {
          const day = todo.date.toISOString().slice(0, 10);

          if (todo.plan) {
            const start = new Date(todo.plan.startAt);
            const idx = start.getHours() * 2 + (start.getMinutes() >= 30 ? 1 : 0);
            for (let i = 0; i < Math.ceil(todo.plan.duration / 30); i++) {
              if (plan[day] && plan[day][idx + i] !== undefined) plan[day][idx + i] += 1;
            }
          }

          if (todo.action) {
            const start = new Date(todo.action.startAt);
            const idx = start.getHours() * 2 + (start.getMinutes() >= 30 ? 1 : 0);
            for (let i = 0; i < Math.ceil(todo.action.duration / 30); i++) {
              if (action[day] && action[day][idx + i] !== undefined) action[day][idx + i] += 1;
            }
          }
        }

        setTimeTableData({
          plan,
          action,
        });

        const categoryMap: Record<
          string,
          {
            name: string;
            color: string;
            totalPercent: number;
            count: number;
            totalPlan: number;
            totalAction: number;
            dailyTrend: Record<string, number>;
          }
        > = {};

        for (const todo of allTodos) {
          const key = todo.category?.name;
          const date = todo.date.toISOString().slice(5, 10);

          if (!key) continue;

          if (!categoryMap[key]) {
            categoryMap[key] = {
              name: key,
              color: todo.category.color,
              totalPercent: 0,
              count: 0,
              totalPlan: 0,
              totalAction: 0,
              dailyTrend: {},
            };
          }

          const cat = categoryMap[key];
          cat.totalPercent += todo.percent;
          cat.count += 1;
          cat.totalPlan += todo.plan?.duration || 0;
          cat.totalAction += todo.action?.duration || 0;
          cat.dailyTrend[date] = (cat.dailyTrend[date] || 0) + 1;
        }

        const categoryStatsData = Object.values(categoryMap).map((cat) => ({
          name: cat.name,
          averagePercent: Math.round(cat.totalPercent / cat.count),
          totalPlan: cat.totalPlan,
          totalAction: cat.totalAction,
          dailyTrend: Object.entries(cat.dailyTrend).map(([day, value]) => ({
            day,
            value,
          })),
        }));

        setCategoryStats(categoryStatsData);
      } catch (error) {
        console.error("주간 통계 데이터 로드 실패", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (!weeklyData) return <div>데이터가 없습니다.</div>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        <h1 className="text-2xl font-bold text-center">📊 주간 통계 요약</h1>
        <WeeklySelector />
        <section className="flex flex-col md:flex-row gap-6">
          {/* 왼쪽: 1/6 (📊 주간 통계 요약) */}
          <div className="md:basis-2/6 md:flex-shrink-0">
            <h2 className="text-xl font-semibold mb-4">주간 요약</h2>
            <WeeklySummary />
          </div>

          {/* 오른쪽: 5/6 (📋 할 일 요약) */}
          <div className="md:basis-4/6 w-full">
            <h2 className="text-xl font-semibold mb-4">📋 할 일 요약</h2>
            <TodoSummaryTable />
          </div>
        </section>
        {/* 피드백 영역 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">📝 주간 피드백</h2>
            <FeedbackBox date={date} type={FeedbackType.WEEKLY} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">📅 일간 피드백 모음</h2>
            <WeeklyDailyFeedbackList />
          </div>
        </section>
        {/* 시간표 요약 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">⏰ 시간표 요약</h2>
          <WeeklyTimeTable plan={timeTableData.plan} action={timeTableData.action} />
        </section>
        {/* 카테고리 통계 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">🏷️ 카테고리 통계</h2>
          <CategoryStats data={categoryStats} />
        </section>
      </div>
    </>
  );
};

export default WeeklyStatsPage;
