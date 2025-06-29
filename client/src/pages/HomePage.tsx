import FeedbackDailyBox from "@/components/FeedbackDailyBox";
import TimeTable from "@/components/TimeTable";
import TodoTable from "@/components/TodoTable";
import { useTodoData } from "@/hooks/useTodoData";
import { useState } from "react";

export default function HomePage() {
  const [manualPercents, setManualPercents] = useState<{ [key: string]: number }>({});
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const { todos, categories, fetchData } = useTodoData(date);

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
            manualPercents={manualPercents}
            setManualPercents={setManualPercents}
            fetchData={() => fetchData(date)}
            date={date}
          />
        </div>
        {/* 오른쪽: 시간표 */}
        <div className="min-w-[320px] max-w-[420px] w-1/2">
          <TimeTable />
        </div>
      </div>
      {/* 아래: 피드백 */}
      <FeedbackDailyBox date={date} />
    </div>
  );
}
