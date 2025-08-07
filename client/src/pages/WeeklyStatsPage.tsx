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
    <div className="w-full mx-auto inline-block origin-top scale-[0.8]">
      <div className="w-full max-w-7xl mx-auto">
        <WeeklySelector />
        <div className="flex gap-7">
          {/* 왼쪽: 1/6 (📊 주간 통계 요약, 주간 피드백) */}
          <div className="md:basis-2/6 md:flex-shrink-0">
            <div>
              <h2 className="text-xl font-semibold mb-2">📊 주간 요약</h2>
              <WeeklySummary />
              <h2 className="text-xl font-semibold mb-2 mt-6">📝 주간 피드백</h2>
              <FeedbackBox date={date} type={FeedbackType.WEEKLY} />
            </div>
          </div>
          {/* 오른쪽: 5/6 (📋 할 일 요약) */}
          <div className="md:basis-4/6 w-full">
            <h2 className="text-xl font-semibold mb-4">📋 할 일 요약</h2>
            <TodoSummaryTable />
          </div>
        </div>
        {/* 시간표 요약, 주간 일간 피드백 */}
        <div className="flex gap-7 mt-10">
          <div>
            <h2 className="text-xl font-semibold mb-2">📅 일간 피드백 모음</h2>
            <WeeklyDailyFeedbackList />
          </div>
          <div>
            <div className="w-full overflow-x-auto">
              <h1 className="font-extrabold text-2xl text-center">Plan</h1>
              <div className="mx-auto w-fit">
                <WeeklyPlanTimeTable />
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <h1 className="font-extrabold text-2xl text-center mt-6">Action</h1>
              <div className="mx-auto w-fit">
                <WeeklyActionTimeTable />
              </div>
            </div>
          </div>
        </div>

        {/* 카테고리 통계 */}
        <div className="mt-24">
          <h1 className="text-2xl font-extrabold text-center mb-8">🏷️ 카테고리 통계</h1>
          <CategoryStats />
        </div>
      </div>
    </div>
  );
};

export default WeeklyStatsPage;
