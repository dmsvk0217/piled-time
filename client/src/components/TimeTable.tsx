import { useState } from "react";

const HOURS = Array.from({ length: 24 }, (_, i) => (i + 6) % 24);
const MINUTES = [0, 10, 20, 30, 40, 50];

function getCellIndex(hour: number, min: number) {
  return HOURS.indexOf(hour) * MINUTES.length + MINUTES.indexOf(min);
}
function getTimeByCellIndex(idx: number) {
  const hour = HOURS[Math.floor(idx / MINUTES.length)];
  const min = MINUTES[idx % MINUTES.length];
  return { hour, min };
}

interface TimeTableProps {
  assigningTodoId: number | null;
  onAssignPlan: (todoId: number, startAt: Date, duration: number) => void;
}

export default function TimeTable({ assigningTodoId, onAssignPlan }: TimeTableProps) {
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragEnd, setDragEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (hour: number, min: number) => {
    const idx = getCellIndex(hour, min);
    setDragStart(idx);
    setDragEnd(idx);
    setIsDragging(true);
  };
  const handleMouseEnter = (hour: number, min: number) => {
    if (!isDragging || dragStart === null) return;
    const idx = getCellIndex(hour, min);
    // 오른쪽(시간순)만 허용
    if (idx >= dragStart) setDragEnd(idx);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    if (assigningTodoId && dragStart !== null && dragEnd !== null && dragEnd >= dragStart) {
      const { hour: startHour, min: startMin } = getTimeByCellIndex(dragStart);
      const startAt = new Date();
      startAt.setHours(startHour, startMin, 0, 0);
      const duration = (dragEnd - dragStart + 1) * 10; // 10분 단위
      onAssignPlan(assigningTodoId, startAt, duration);
    }
  };
  const isSelected = (idx: number) => {
    if (dragStart === null || dragEnd === null) return false;
    return idx >= dragStart && idx <= dragEnd;
  };

  return (
    <div
      className="overflow-x-auto"
      style={{ minWidth: 320, maxWidth: 420, width: "100%", marginTop: 0 }}>
      <table className="border text-xs select-none" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th className="border px-2 py-1">시간</th>
            {MINUTES.map((min) => (
              <th key={min} className="border px-2 py-1">
                {min.toString().padStart(2, "0")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOURS.map((hour) => (
            <tr key={hour}>
              <td className="border px-2 py-1 font-bold bg-gray-50">
                {hour === 0 ? "00" : hour.toString().padStart(2, "0")}
              </td>
              {MINUTES.map((min) => {
                const idx = getCellIndex(hour, min);
                return (
                  <td
                    key={min}
                    className={`border w-8 h-8 bg-white hover:bg-blue-50 cursor-pointer ${
                      isSelected(idx) ? "bg-blue-200" : ""
                    }`}
                    onMouseDown={() => handleMouseDown(hour, min)}
                    onMouseEnter={() => handleMouseEnter(hour, min)}
                    onMouseUp={handleMouseUp}></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
