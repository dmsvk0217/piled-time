import { createAction, deleteAction, updateAction } from "@/api/action";
import { createPlan, deletePlan, updatePlan } from "@/api/plan";
import { Action } from "@/types/action";
import { Category } from "@/types/category";
import { Plan } from "@/types/plan";
import { Todo } from "@/types/todo";
import { useState } from "react";
import TimeTableItemModal from "./TimeTableItemModal";

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

type ItemMap = {
  actions: Action;
  plans: Plan;
};

interface BaseTimeTableProps<K extends keyof ItemMap> {
  assigningTodoId: number | null;
  todos: Todo[];
  categories: Category[];
  itemKey: K;
  typeLabel: string;
}

export default function BaseTimeTable<K extends keyof ItemMap>({
  assigningTodoId,
  todos,
  categories,
  itemKey,
  typeLabel,
}: BaseTimeTableProps<K>) {
  type T = ItemMap[K];

  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragEnd, setDragEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    (T & { todo: Todo; category: Category | undefined }) | null
  >(null);
  const [dragMode, setDragMode] = useState<null | "assign" | "edit">(null);
  const [loading, setLoading] = useState(false);

  // 모든 item(actions/plans) 합치기
  const allItems: (T & { todo: Todo; category: Category | undefined })[] = [];
  todos.forEach((todo) => {
    const items = todo?.[itemKey] as T[] | undefined;
    if (Array.isArray(items)) {
      items.forEach((item) => {
        const category = todo.category || categories.find((c) => c.id === todo.category.id);
        allItems.push({ ...item, todo, category });
      });
    }
  });

  // item이 차지하는 셀 인덱스 계산
  const getItemCellIndexes = (item: T) => {
    const start = new Date(item.startAt);
    const startIdx = getCellIndex(start.getHours(), start.getMinutes());
    const cellCount = Math.ceil(item.duration / 10);
    return Array.from({ length: cellCount }, (_, i) => startIdx + i);
  };

  // 셀 인덱스별로 item 매핑
  const cellItemMap: { [idx: number]: T & { todo: Todo; category: Category | undefined } } = {};
  allItems.forEach((item) => {
    getItemCellIndexes(item).forEach((idx) => {
      cellItemMap[idx] = item;
    });
  });

  const resetDrag = () => {
    setDragMode(null);
    setDragStart(null);
    setDragEnd(null);
    setIsDragging(false);
  };

  const handleCellClick = (idx: number) => {
    const item = cellItemMap[idx];
    if (item) {
      setSelectedItem(item);
      resetDrag();
    }
  };

  const handleMouseDown = (hour: number, min: number) => {
    const idx = getCellIndex(hour, min);
    if (assigningTodoId) {
      setDragMode("assign");
      setDragStart(idx);
      setDragEnd(idx);
      setIsDragging(true);
      return;
    }
    if (selectedItem) {
      setDragMode("edit");
      setDragStart(idx);
      setDragEnd(idx);
      setIsDragging(true);
      return;
    }
  };

  const handleMouseEnter = (hour: number, min: number) => {
    if (!isDragging) return;
    const idx = getCellIndex(hour, min);
    if (dragStart === null) return;
    if (idx === dragStart) return;
    let limitIdx = idx;

    if (dragMode === "edit" && selectedItem) {
      // 본인 블록만 덮어쓰기 허용
      if (idx > dragStart) {
        for (let i = dragStart + 1; i <= idx; i++) {
          if (cellItemMap[i] && cellItemMap[i].id !== selectedItem.id) {
            limitIdx = i - 1;
            break;
          }
        }
      } else {
        for (let i = dragStart - 1; i >= idx; i--) {
          if (cellItemMap[i] && cellItemMap[i].id !== selectedItem.id) {
            limitIdx = i + 1;
            break;
          }
        }
      }
    }

    if (dragMode === "assign" && assigningTodoId) {
      if (idx > dragStart) {
        for (let i = dragStart + 1; i <= idx; i++) {
          if (cellItemMap[i]) {
            limitIdx = i - 1;
            break;
          }
        }
      } else {
        for (let i = dragStart - 1; i >= idx; i--) {
          if (cellItemMap[i]) {
            limitIdx = i + 1;
            break;
          }
        }
      }
    }
    setDragEnd(limitIdx);
  };

  const handleMouseUp = () => {
    if (dragStart === null || dragEnd === null) return;

    const minIdx = Math.min(dragStart, dragEnd);
    const maxIdx = Math.max(dragStart, dragEnd);
    const duration = (maxIdx - minIdx + 1) * 10; // 1칸이면 10

    const { hour: startHour, min: startMin } = getTimeByCellIndex(minIdx);
    const startAt = new Date();
    startAt.setHours(startHour, startMin, 0, 0);
    setLoading(true);

    if (dragMode === "edit" && selectedItem) {
      const updateFn = itemKey === "actions" ? updateAction : updatePlan;
      updateFn(selectedItem.id, { startAt: startAt.toISOString(), duration })
        .then(() => window.location.reload())
        .finally(() => setLoading(false));
      setSelectedItem(null);
    }

    if (dragMode === "assign" && assigningTodoId) {
      const assignFn = itemKey === "actions" ? createAction : createPlan;
      assignFn(assigningTodoId, startAt.toISOString(), duration)
        .then(() => window.location.reload())
        .finally(() => setLoading(false));
    }

    resetDrag();
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
      style={{ minWidth: 320, maxWidth: 420, width: "100%", marginTop: 0 }}>
      <div className="font-bold mb-1">{typeLabel} Time Table</div>
      <table className="border text-xs select-none table-fixed w-full" style={{ width: "100%" }}>
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
                const item = cellItemMap[idx];
                const bgColor = item?.category?.color || (isSelected(idx) ? "#bfdbfe" : "#fff");
                return (
                  <td
                    key={min}
                    className={`border w-8 h-8 cursor-pointer`}
                    style={{ backgroundColor: bgColor, opacity: item ? 0.7 : 1 }}
                    onMouseDown={item ? undefined : () => handleMouseDown(hour, min)}
                    onClick={item ? () => handleCellClick(idx) : undefined}
                    onMouseEnter={() => handleMouseEnter(hour, min)}
                    onMouseUp={handleMouseUp}
                    title={item ? item.todo?.content : undefined}></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <TimeTableItemModal
        open={!!selectedItem && dragMode !== "edit"}
        item={selectedItem}
        loading={loading}
        onEdit={() => {
          setDragMode("edit");
        }}
        onDelete={async () => {
          setLoading(true);
          const deleteFn = itemKey === "actions" ? deleteAction : deletePlan;
          if (selectedItem) {
            await deleteFn(selectedItem.id);
            window.location.reload();
          }
          setLoading(false);
        }}
        onClose={() => {
          setSelectedItem(null);
          resetDrag();
        }}
      />
    </div>
  );
}
