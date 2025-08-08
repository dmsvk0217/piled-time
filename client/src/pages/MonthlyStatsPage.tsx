import FeedbackBox from "@/components/common/FeedbackBox";
import MonthlyCategoryStats from "@/components/stats/MonthlylyCategoryStats";
import MonthlySelector from "@/components/stats/MonthlySelector";
import MonthlySummary from "@/components/stats/MonthlySummary";
import { useMonthlyStatsStore } from "@/stores/useMonthlyStatsStore";
import { FeedbackType } from "@/types/feedback";
import { useEffect, useState } from "react";

const MonthlyStatsPage = () => {
  const date = useMonthlyStatsStore((s) => s.date);
  const monthlyData = useMonthlyStatsStore((s) => s.monthlyData);
  const fetchMonthlyPlannerData = useMonthlyStatsStore((s) => s.fetchMonthlyPlannerData);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchMonthlyPlannerData(date);
      } catch (error) {
        console.error("주간 통계 데이터 로드 실패", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (!monthlyData) return <div>데이터가 없습니다.</div>;

  return (
    <div className="w-full mx-auto inline-block origin-top scale-[0.8]">
      <div className="w-full max-w-7xl mx-auto">
        <MonthlySelector />
        <div className="flex gap-7">
          {/* 왼쪽: 1/6 (📊 주간 통계 요약, 주간 피드백) */}
          <div className="md:basis-2/6 md:flex-shrink-0">
            <div>
              <h2 className="text-xl font-semibold mb-2">📊 월간 요약</h2>
              <MonthlySummary />
              <h2 className="text-xl font-semibold mb-2 mt-6">📝 월간 피드백</h2>
              <FeedbackBox date={date} type={FeedbackType.MONTHLY} />
            </div>
          </div>
          {/* 오른쪽: 5/6 (카테고리 통계) */}
          <div className="md:basis-4/6 w-full">
            <h1 className="text-xl font-semibold mb-4">🏷️ 월간 카테고리 통계</h1>
            <MonthlyCategoryStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStatsPage;
