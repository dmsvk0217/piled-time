import { useWeeklyStatsStore } from "@/stores/useWeeklyStatsStore";
import {
  addWeeks,
  endOfWeek,
  format,
  getWeek,
  isAfter,
  isBefore,
  isSameWeek,
  isThisWeek,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { ko } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function WeeklySelector() {
  const date = useWeeklyStatsStore((s) => s.date);
  const setDate = useWeeklyStatsStore((s) => s.setDate);
  const fetchWeeklyPlannerData = useWeeklyStatsStore((s) => s.fetchWeeklyPlannerData);

  const [direction, setDirection] = useState(0);
  const prevDateRef = useRef(date);

  const today = new Date();
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
  const isCurrentWeek = isThisWeek(date, { weekStartsOn: 0 });
  const isNextWeekInFuture = isAfter(startOfWeek(addWeeks(date, 1), { weekStartsOn: 0 }), today);
  const weekNumber = getWeek(weekStart, { weekStartsOn: 1, locale: ko });
  const formattedRange = `${format(weekStart, "yyyy.MM.dd")} ~ ${format(
    weekEnd,
    "MM.dd"
  )} (${weekNumber}주차)`;

  useEffect(() => {
    const prev = prevDateRef.current;
    if (isBefore(date, prev)) setDirection(-1);
    else if (isAfter(date, prev)) setDirection(1);
    else setDirection(0);
    prevDateRef.current = date;
  }, [date]);

  useEffect(() => {
    fetchWeeklyPlannerData(date);
  }, [date]);

  const handlePrevWeek = () => {
    setDate(subWeeks(date, 1));
  };

  const handleNextWeek = () => {
    if (isNextWeekInFuture) return;
    setDate(addWeeks(date, 1));
  };

  const handleResetToToday = () => {
    if (!isSameWeek(date, today, { weekStartsOn: 0 })) {
      setDate(today);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 gap-2">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrevWeek}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">
          ⬅️ 이전 주
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={date.toISOString()}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.3 }}
            className={`font-semibold text-sm px-3 py-1 rounded text-center ${
              isCurrentWeek ? "bg-yellow-200 text-black" : "text-gray-700"
            }`}>
            <div>{isCurrentWeek ? "🟡 이번 주" : `📅 ${weekNumber}주차`}</div>
            <div className="text-xs">{formattedRange}</div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNextWeek}
          disabled={isNextWeekInFuture}
          className={`px-3 py-1 rounded text-sm ${
            isNextWeekInFuture
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}>
          다음 주 ➡️
        </button>
      </div>

      <div className="h-5 text-center">
        {!isCurrentWeek ? (
          <button
            onClick={handleResetToToday}
            className="text-blue-600 text-xs underline hover:text-blue-800">
            🔄 이번주 돌아가기
          </button>
        ) : (
          <span className="invisible text-xs">🔄 오늘로 돌아가기</span>
        )}
      </div>
    </div>
  );
}
