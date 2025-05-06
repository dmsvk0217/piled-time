import TodoTable from "@/components/TodoTable";
import { useTodoData } from "@/hooks/useTodoData";
import { useState } from "react";

export default function Home() {
  const { todos, categories, error, isLoading, fetchData } = useTodoData();

  const [manualPercents, setManualPercents] = useState<{ [key: string]: number }>({});

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">📅 오늘의 플래너</h1>
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center">{error}</div>}
      {isLoading && <p className="text-center text-gray-500">불러오는 중...</p>}
      {!isLoading && !error && (
        <TodoTable
          todos={todos}
          categories={categories}
          manualPercents={manualPercents}
          setManualPercents={setManualPercents}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}
