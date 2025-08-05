import { useHomePageStore } from "@/stores/useHomePageStore";
import { addDays, format, isToday } from "date-fns";

export default function DateSelector() {
  const date = useHomePageStore((s) => s.date);
  const setDate = useHomePageStore((s) => s.setDate);

  return (
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
  );
}
