import ActionTimeTable from "@/components/ActionTimeTable";
import AdviceCard from "@/components/AdviceCard";
import FeedbackDailyBox from "@/components/FeedbackDailyBox";
import Memo from "@/components/Memo";
import PlanTimeTable from "@/components/PlanTimeTable";
import TodoTable from "@/components/TodoTable";
import { useCategoryStore } from "@/stores/useCatgoryStore";
import { useHomePageStore } from "@/stores/useHomePageStore";
import { useTodoStore } from "@/stores/useTodoStore";
import { format } from "date-fns";
import { useEffect } from "react";

export default function HomePage() {
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);
  const fetchTododetail = useTodoStore((s) => s.fetchTododetails);

  const date = useHomePageStore((s) => s.date);
  const setDate = useHomePageStore((s) => s.setDate);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTododetail(date);
  }, [date]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-8 px-5 mx-auto max-w-7xl md:flex-row items-start w-full">
        {/* 할일 테이블 */}
        <div className="flex-[2] min-w-[320px] max-w-[700px] w-full md:w-auto">
          {/* 날짜 선택 */}
          <div className="mb-2 flex gap-2 items-center">
            <input
              type="date"
              value={format(date, "yyyy-MM-dd")}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="border px-2 py-1 rounded"
            />
          </div>
          <TodoTable />

          <div className="flex gap-2 items-center mt-5">
            <div className="flex-[2] ">
              <Memo />
            </div>
            <div className="flex-[3]">
              <AdviceCard />
            </div>
          </div>

          {/* 피드백 */}
          <FeedbackDailyBox date={date} />
        </div>
        {/* 플랜 시간표 */}
        <div className="flex-[1] min-w-[280px] max-w-[420px] w-full md:w-auto">
          <PlanTimeTable />
        </div>
        {/* 액션 시간표 */}
        <div className="flex-[1] min-w-[280px] max-w-[420px] w-full md:w-auto">
          <ActionTimeTable />
        </div>
      </div>
    </div>
  );
}
