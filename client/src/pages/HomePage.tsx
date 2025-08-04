import AdviceCard from "@/components/AdviceCard";
import FeedbackBox from "@/components/common/FeedbackBox";
import Memo from "@/components/Memo";
import ActionTimeTable from "@/components/timetable/ActionTimeTable";
import PlanTimeTable from "@/components/timetable/PlanTimeTable";
import TodoTable from "@/components/todo/TodoTable";
import { useCategoryStore } from "@/stores/useCatgoryStore";
import { useHomePageStore } from "@/stores/useHomePageStore";
import { useTodoStore } from "@/stores/useTodoStore";
import { FeedbackType } from "@/types/feedback";
import { addDays, format, isToday } from "date-fns";
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
          <div className="mb-2 flex items-center gap-2">
            <button
              className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
              onClick={() => setDate(addDays(date, -1))}>
              이전 날
            </button>

            <input
              type="date"
              value={format(date, "yyyy-MM-dd")}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="border px-2 py-1 rounded"
            />
            <button
              className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
              onClick={() => setDate(addDays(date, 1))}>
              다음 날
            </button>
            {!isToday(date) && (
              <button
                className="px-3 py-1 border rounded bg-blue-100 hover:bg-blue-200"
                onClick={() => setDate(new Date())}>
                오늘
              </button>
            )}
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
          <FeedbackBox date={date} type={FeedbackType.DAILY} />
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
