import FeedbackBox from "@/components/common/FeedbackBox";
import CategoryStats from "@/components/stats/CategoryStats";
import TodoSummaryTable from "@/components/stats/TodoSummaryTable";
import WeeklyActionTimeTable from "@/components/stats/WeeklyActionTimeTable";
import WeeklyDailyFeedbackList from "@/components/stats/WeeklyDailyFeedbackList";
import WeeklyPlanTimeTable from "@/components/stats/WeeklyPlanTimeTable";
import WeeklySelector from "@/components/stats/WeeklySelector";
import WeeklySummary from "@/components/stats/WeeklySummary";
import { useWeeklyStatsStore } from "@/stores/useWeeklyStatsStore";
import { FeedbackType } from "@/types/feedback";
import { useEffect, useState } from "react";

const WeeklyStatsPage = () => {
  const date = useWeeklyStatsStore((s) => s.date);
  const weeklyData = useWeeklyStatsStore((s) => s.weeklyData);
  const fetchWeeklyPlannerData = useWeeklyStatsStore((s) => s.fetchWeeklyPlannerData);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchWeeklyPlannerData(date);
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
    <div className="inline-block origin-top scale-[0.8]">
      <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
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
      </div>
      {/* 시간표 요약 */}
      <div className="w-full overflow-x-auto">
        <h1 className="font-extrabold text-2xl text-center mt-14 mb-6">Plan</h1>
        <div className="mx-auto w-fit">
          <WeeklyPlanTimeTable />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <h1 className="font-extrabold text-2xl text-center mt-14 mb-6">Action</h1>
        <div className="mx-auto w-fit">
          <WeeklyActionTimeTable />
        </div>
      </div>
      {/* 카테고리 통계 */}
      <div className="mt-24">
        <h1 className="text-2xl font-extrabold text-center mb-8">🏷️ 카테고리 통계</h1>
        <CategoryStats />
      </div>
    </div>
  );
};

export default WeeklyStatsPage;
