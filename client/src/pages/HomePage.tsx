import AdviceCard from "@/components/AdviceCard";
import FeedbackBox from "@/components/common/FeedbackBox";
import DateSelector from "@/components/DateSelector";
import Memo from "@/components/Memo";
import ActionTimeTable from "@/components/timetable/ActionTimeTable";
import PlanTimeTable from "@/components/timetable/PlanTimeTable";
import TodoTable from "@/components/todo/TodoTable";
import { useCategoryStore } from "@/stores/useCatgoryStore";
import { useHomePageStore } from "@/stores/useHomePageStore";
import { useTodoStore } from "@/stores/useTodoStore";
import { FeedbackType } from "@/types/feedback";
import { useEffect } from "react";

export default function HomePage() {
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);
  const fetchTododetail = useTodoStore((s) => s.fetchTododetails);

  const date = useHomePageStore((s) => s.date);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTododetail(date);
  }, [date]);

  return (
    <div className="flex flex-col w-full origin-top scale-[0.7]">
      <div className="flex flex-col gap-5 px-5 mx-auto max-w-7xl md:flex-row items-start w-full">
        <div className="flex-[2] w-full md:w-auto">
          <DateSelector />
          <TodoTable />
          <div className="flex gap-2 items-center mt-5">
            <div className="flex-[2] ">
              <Memo />
            </div>
            <div className="flex-[3]">
              <AdviceCard />
            </div>
          </div>
          <FeedbackBox date={date} type={FeedbackType.DAILY} />
        </div>
        <div className="flex-[1] w-full md:w-auto">
          <PlanTimeTable />
        </div>
        <div className="flex-[1] w-full md:w-auto">
          <ActionTimeTable />
        </div>
      </div>
    </div>
  );
}
