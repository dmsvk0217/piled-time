import { ActionTimeTable } from "@/components/ActionTimeTable";
import FeedbackDailyBox from "@/components/FeedbackDailyBox";
import Memo from "@/components/Memo";
import { PlanTimeTable } from "@/components/PlanTimeTable";
import ScriptureBox from "@/components/ScriptureBox";
import TodoTable from "@/components/TodoTable";
import { useCategory } from "@/hooks/useCategory";
import { useTodoDetail } from "@/hooks/useTodoDetail";
import { useState } from "react";

export default function HomePage() {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const { todos, fetchTodoDetail } = useTodoDetail(date);
  const { categories, fetchCategory } = useCategory();
  const [assigningActionTodoId, setAssigningActionTodo] = useState<number | null>(null);
  const [assigningPlanTodoId, setAssigningPlanTodo] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-8 px-5 mx-auto max-w-7xl md:flex-row items-start w-full">
        {/* 할일 테이블 */}
        <div className="flex-[2] min-w-[320px] max-w-[700px] w-full md:w-auto">
          {/* 날짜 선택 */}
          <div className="mb-2 flex gap-2 items-center">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>
          <TodoTable
            date={date}
            todos={todos}
            fetchTodoDetail={() => fetchTodoDetail(date)}
            categories={categories}
            fetchCategory={fetchCategory}
            assigningActionTodoId={assigningActionTodoId}
            setAssigningActionTodo={setAssigningActionTodo}
            assigningPlanTodoId={assigningPlanTodoId}
            setAssigningPlanTodo={setAssigningPlanTodo}
          />

          {/* 메모 */}
          <Memo date={date} />

          {/* 피드백 */}
          <FeedbackDailyBox date={date} />

          {/* 말씀 묵상 구절 */}
          <ScriptureBox
            verses={[
              "여호와께서 집을 세우지 아니하시면 세우는 자의 수고가 헛되며 여호와께서 성을 지키지 아니하시면 파수꾼의 깨어 있음이 헛되도다",
              "너희가 일찍이 일어나고 늦게 누우며 수고의 떡을 먹음이 헛되도다 그러므로 여호와께서 그의 사랑하시는 자에게는 잠을 주시는도다",
            ]}
            reference="시편 127편 1-2절"
          />
        </div>
        {/* 플랜 시간표 */}
        <div className="flex-[1] min-w-[280px] max-w-[420px] w-full md:w-auto">
          <PlanTimeTable
            assigningTodoId={assigningPlanTodoId}
            todos={todos}
            categories={categories}
          />
        </div>
        {/* 액션 시간표 */}
        <div className="flex-[1] min-w-[280px] max-w-[420px] w-full md:w-auto">
          <ActionTimeTable
            assigningTodoId={assigningActionTodoId}
            todos={todos}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}
