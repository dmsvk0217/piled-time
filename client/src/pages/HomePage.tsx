import { createAction } from "@/api/actionApi";
import FeedbackDailyBox from "@/components/FeedbackDailyBox";
import TimeTable from "@/components/TimeTable";
import TodoTable from "@/components/TodoTable";
import { useCategory } from "@/hooks/useCategory";
import { useTodoDetail } from "@/hooks/useTodoData";
import { useState } from "react";

export default function HomePage() {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const { todos, fetchData } = useTodoDetail(date);
  const { categories } = useCategory();
  const [assigningTodoId, setAssigningTodo] = useState<number | null>(null);

  // action 생성 및 목록 갱신
  const handleAssignPlan = async (
    todoId: number,
    startAt: Date,
    duration: number,
    resetDrag: () => void
  ) => {
    await createAction(todoId, startAt.toISOString(), duration);
    setAssigningTodo(null);
    await fetchData(date);
    resetDrag(); // action 생성 후에만 드래그 상태 초기화
  };

  return (
    <div className="flex flex-col gap-8 px-2 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start w-full">
        {/* 왼쪽: 할일 테이블 */}
        <div className="flex-1 min-w-[320px] max-w-[700px] w-1/2">
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
            todos={todos}
            categories={categories}
            fetchData={() => fetchData(date)}
            date={date}
            assigningTodoId={assigningTodoId}
            setAssigningTodo={setAssigningTodo}
          />
        </div>
        {/* 오른쪽: 시간표 */}
        <div className="min-w-[320px] max-w-[420px] w-1/2">
          <TimeTable
            assigningTodoId={assigningTodoId}
            onAssignPlan={handleAssignPlan}
            todos={todos}
            categories={categories}
          />
        </div>
      </div>
      {/* 아래: 피드백 */}
      <FeedbackDailyBox date={date} />
    </div>
  );
}
