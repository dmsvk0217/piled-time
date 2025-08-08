import { useMonthlyStatsStore } from "@/stores/useMonthlyStatsStore";
import {
  addMonths,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameMonth,
  isThisMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function MonthlySelector() {
  const date = useMonthlyStatsStore((s) => s.date);
  const setDate = useMonthlyStatsStore((s) => s.setDate);
  const fetchMonthlyPlannerData = useMonthlyStatsStore((s) => s.fetchMonthlyPlannerData);

  const [direction, setDirection] = useState(0);
  const prevDateRef = useRef(date);

  const today = new Date();
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const isCurrentMonth = isThisMonth(date);
  const isNextMonthInFuture = isAfter(startOfMonth(addMonths(date, 1)), today);
  const monthNumber = format(monthStart, "M", { locale: ko }); // 1~12월
  const formattedRange = `${format(monthStart, "yyyy.MM.dd")} ~ ${format(
    monthEnd,
    "MM.dd"
  )} (${monthNumber}월)`;

  useEffect(() => {
    const prev = prevDateRef.current;
    if (isBefore(date, prev)) setDirection(-1);
    else if (isAfter(date, prev)) setDirection(1);
    else setDirection(0);
    prevDateRef.current = date;
  }, [date]);

  useEffect(() => {
    fetchMonthlyPlannerData(date);
  }, [date]);

  const handlePrevMonth = () => {
    setDate(subMonths(date, 1));
  };

  const handleNextMonth = () => {
    if (isNextMonthInFuture) return;
    setDate(addMonths(date, 1));
  };

  const handleResetToToday = () => {
    if (!isSameMonth(date, today)) {
      setDate(today);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrevMonth}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">
          ⬅️ 이전 달
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={date.toISOString()}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.3 }}
            className={`font-semibold text-sm px-3 py-1 rounded text-center ${
              isCurrentMonth ? "bg-yellow-200 text-black" : "text-gray-700"
            }`}>
            <div>{isCurrentMonth ? "🟡 이번 달" : `📅 ${monthNumber}월`}</div>
            <div className="text-xs">{formattedRange}</div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNextMonth}
          disabled={isNextMonthInFuture}
          className={`px-3 py-1 rounded text-sm ${
            isNextMonthInFuture
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}>
          다음 달 ➡️
        </button>
      </div>

      <div className="h-5 text-center">
        {!isCurrentMonth ? (
          <button
            onClick={handleResetToToday}
            className="text-blue-600 text-xs underline hover:text-blue-800">
            🔄 이번 달로 돌아가기
          </button>
        ) : (
          <span className="invisible text-xs">🔄 오늘로 돌아가기</span>
        )}
      </div>
    </div>
  );
}
