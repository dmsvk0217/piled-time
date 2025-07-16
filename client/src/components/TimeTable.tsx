import { Action } from "@/types/action";
import { Category } from "@/types/category";
import { Todo } from "@/types/todo";
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
  onAssignPlan: (todoId: number, startAt: Date, duration: number, resetDrag: () => void) => void;
  todos: (Todo & { actions?: Action[]; categoryId?: number })[];
  categories: Category[];
}

export default function TimeTable({
  assigningTodoId,
  onAssignPlan,
  todos,
  categories,
}: TimeTableProps) {
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragEnd, setDragEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // todos에서 모든 action을 합침
  const allActions: (Action & { todo: Todo; category: Category | undefined })[] = [];
  todos.forEach((todo) => {
    if (Array.isArray((todo as any).actions)) {
      (todo as any).actions.forEach((action: Action) => {
        const category = categories.find((c) => c.id === (todo as any).category.id);
        allActions.push({ ...action, todo, category });
      });
    }
  });
  // action이 차지하는 셀 인덱스 계산
  const getActionCellIndexes = (action: Action) => {
    const start = new Date(action.startAt);
    const startIdx = getCellIndex(start.getHours(), start.getMinutes());
    const cellCount = Math.ceil(action.duration / 10);
    return Array.from({ length: cellCount }, (_, i) => startIdx + i);
  };

  // 셀 인덱스별로 action 매핑
  const cellActionMap: { [idx: number]: Action & { todo: Todo; category: Category | undefined } } =
    {};
  allActions.forEach((action) => {
    getActionCellIndexes(action).forEach((idx) => {
      cellActionMap[idx] = action;
    });
  });

  const handleMouseDown = (hour: number, min: number) => {
    if (!assigningTodoId) return; // assigningTodoId 없으면 드래그 불가

    const idx = getCellIndex(hour, min);
    setDragStart(idx);
    setDragEnd(idx);
    setIsDragging(true);
  };

  const handleMouseEnter = (hour: number, min: number) => {
    if (!assigningTodoId || !isDragging || dragStart === null) return;
    const idx = getCellIndex(hour, min);
    if (idx === dragStart) return;

    let limitIdx = idx;
    if (idx > dragStart) {
      for (let i = dragStart + 1; i <= idx; i++) {
        if (cellActionMap[i]) {
          limitIdx = i - 1;
          break;
        }
      }
    } else {
      for (let i = dragStart - 1; i >= idx; i--) {
        if (cellActionMap[i]) {
          limitIdx = i + 1;
          break;
        }
      }
    }
    setDragEnd(limitIdx);
  };

  const resetDrag = () => {
    setDragStart(null);
    setDragEnd(null);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    try {
      if (assigningTodoId && dragStart !== null && dragEnd !== null && dragEnd !== dragStart) {
        const { hour: startHour, min: startMin } = getTimeByCellIndex(
          dragStart < dragEnd ? dragStart : dragEnd
        );
        const startAt = new Date();
        startAt.setHours(startHour, startMin, 0, 0);
        const duration = (Math.abs(dragEnd - dragStart) + 1) * 10;
        onAssignPlan(assigningTodoId, startAt, duration, resetDrag);
      }
    } finally {
      resetDrag();
    }
  };

  const isSelected = (idx: number) => {
    if (dragStart === null || dragEnd === null) return false;
    const minIdx = Math.min(dragStart, dragEnd);
    const maxIdx = Math.max(dragStart, dragEnd);
    return idx >= minIdx && idx <= maxIdx;
  };

  return (
    <div
      className="overflow-x-auto"
      style={{ minWidth: 320, maxWidth: 420, width: "100%", marginTop: 0 }}
      onMouseLeave={resetDrag}>
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
                const action = cellActionMap[idx];
                const bgColor = action?.category?.color || (isSelected(idx) ? "#bfdbfe" : "#fff");
                return (
                  <td
                    key={min}
                    className={`border w-8 h-8 cursor-pointer`}
                    style={{ backgroundColor: bgColor, opacity: action ? 0.7 : 1 }}
                    onMouseDown={isSelected(idx) ? resetDrag : () => handleMouseDown(hour, min)}
                    onMouseEnter={() => handleMouseEnter(hour, min)}
                    onMouseUp={handleMouseUp}
                    title={action ? action.todo?.content : undefined}></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
