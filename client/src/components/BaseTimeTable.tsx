import { deleteAction, updateAction } from "@/api/actionApi";
import { deletePlan, updatePlan } from "@/api/planApi";
import { Action } from "@/types/action";
import { Category } from "@/types/category";
import { Plan } from "@/types/plan";
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

type ItemMap = {
  actions: Action;
  plans: Plan;
};

interface BaseTimeTableProps<K extends keyof ItemMap> {
  assigningTodoId: number | null;
  onAssign: (todoId: number, startAt: Date, duration: number, resetDrag: () => void) => void;
  todos: Todo[];
  categories: Category[];
  itemKey: K;
  typeLabel: string;
}

export default function BaseTimeTable<K extends keyof ItemMap>({
  assigningTodoId,
  onAssign,
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
  const [editMode, setEditMode] = useState(false);
  const [editDragStart, setEditDragStart] = useState<number | null>(null);
  const [editDragEnd, setEditDragEnd] = useState<number | null>(null);
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
    setDragStart(null);
    setDragEnd(null);
    setIsDragging(false);
    setEditMode(false);
    setEditDragStart(null);
    setEditDragEnd(null);
  };

  const handleMouseDown = (hour: number, min: number) => {
    if (assigningTodoId) {
      const idx = getCellIndex(hour, min);
      setDragStart(idx);
      setDragEnd(idx);
      setIsDragging(true);
    }
  };

  const handleCellClick = (idx: number) => {
    const item = cellItemMap[idx];
    if (item) {
      setSelectedItem(item);
      resetDrag();
    }
  };

  const handleMouseEnter = (hour: number, min: number) => {
    if (!isDragging && !editMode) return;
    const idx = getCellIndex(hour, min);
    if (editMode) {
      if (editDragStart === null) return;
      if (idx === editDragStart) return;
      let limitIdx = idx;
      if (idx > editDragStart) {
        for (let i = editDragStart + 1; i <= idx; i++) {
          if (cellItemMap[i] && cellItemMap[i].id !== selectedItem?.id) {
            limitIdx = i - 1;
            break;
          }
        }
      } else {
        for (let i = editDragStart - 1; i >= idx; i--) {
          if (cellItemMap[i] && cellItemMap[i].id !== selectedItem?.id) {
            limitIdx = i + 1;
            break;
          }
        }
      }
      setEditDragEnd(limitIdx);
    } else {
      if (dragStart === null) return;
      if (idx === dragStart) return;
      let limitIdx = idx;
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
      setDragEnd(limitIdx);
    }
  };

  const handleMouseUp = () => {
    if (editMode) {
      if (
        selectedItem &&
        editDragStart !== null &&
        editDragEnd !== null &&
        editDragEnd !== editDragStart
      ) {
        const { hour: startHour, min: startMin } = getTimeByCellIndex(
          editDragStart < editDragEnd ? editDragStart : editDragEnd
        );
        const startAt = new Date();
        startAt.setHours(startHour, startMin, 0, 0);
        const duration = (Math.abs(editDragEnd - editDragStart) + 1) * 10;
        setLoading(true);
        const updateFn = itemKey === "actions" ? updateAction : updatePlan;
        updateFn(selectedItem.id, { startAt: startAt.toISOString(), duration })
          .then(() => window.location.reload())
          .finally(() => setLoading(false));
      }
      setEditMode(false);
      setSelectedItem(null);
      resetDrag();
      return;
    }
    if (assigningTodoId && dragStart !== null && dragEnd !== null && dragEnd !== dragStart) {
      const { hour: startHour, min: startMin } = getTimeByCellIndex(
        dragStart < dragEnd ? dragStart : dragEnd
      );
      const startAt = new Date();
      startAt.setHours(startHour, startMin, 0, 0);
      const duration = (Math.abs(dragEnd - dragStart) + 1) * 10;
      onAssign(assigningTodoId, startAt, duration, resetDrag);
    }
    resetDrag();
  };

  const isSelected = (idx: number) => {
    if (editMode) {
      if (editDragStart === null || editDragEnd === null) return false;
      const minIdx = Math.min(editDragStart, editDragEnd);
      const maxIdx = Math.max(editDragStart, editDragEnd);
      return idx >= minIdx && idx <= maxIdx;
    }
    if (dragStart === null || dragEnd === null) return false;
    const minIdx = Math.min(dragStart, dragEnd);
    const maxIdx = Math.max(dragStart, dragEnd);
    return idx >= minIdx && idx <= maxIdx;
  };

  // 모달 렌더링
  const renderItemModal = () => {
    if (!selectedItem) return null;
    const start = new Date(selectedItem.startAt);
    const end = new Date(start.getTime() + selectedItem.duration * 60000);
    return (
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 50,
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          setSelectedItem(null);
          resetDrag();
        }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            minWidth: 280,
            minHeight: 120,
            padding: 24,
            boxShadow: "0 2px 16px #0002",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}>
          <div style={{ marginBottom: 12 }}>
            <b>할 일:</b> {selectedItem.todo?.content}
            <br />
            <b>카테고리:</b> {selectedItem.category?.name}
            <br />
            <b>시간:</b> {start.getHours().toString().padStart(2, "0")}:
            {start.getMinutes().toString().padStart(2, "0")} ~{" "}
            {end.getHours().toString().padStart(2, "0")}:
            {end.getMinutes().toString().padStart(2, "0")}
          </div>
          <button
            onClick={() => {
              setEditMode(true);
              setEditDragStart(getCellIndex(start.getHours(), start.getMinutes()));
              setEditDragEnd(
                getCellIndex(start.getHours(), start.getMinutes()) +
                  Math.ceil(selectedItem.duration / 10) -
                  1
              );
              setSelectedItem(null); // 모달 닫기
              setTimeout(() => {
                setIsDragging(true);
              }, 0);
            }}
            disabled={editMode || loading}
            style={{
              marginRight: 8,
              background: "#2563eb",
              color: "#fff",
              border: 0,
              borderRadius: 4,
              padding: "6px 12px",
              cursor: "pointer",
            }}>
            시간대 수정
          </button>
          <button
            onClick={async () => {
              setLoading(true);
              const deleteFn = itemKey === "actions" ? deleteAction : deletePlan;
              await deleteFn(selectedItem.id);
              window.location.reload();
            }}
            disabled={loading}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: 0,
              borderRadius: 4,
              padding: "6px 12px",
              cursor: "pointer",
            }}>
            삭제
          </button>
          <button
            onClick={() => {
              setSelectedItem(null);
              resetDrag();
            }}
            style={{
              marginLeft: 8,
              background: "#e5e7eb",
              color: "#222",
              border: 0,
              borderRadius: 4,
              padding: "6px 12px",
              cursor: "pointer",
            }}>
            닫기
          </button>
        </div>
      </div>
    );
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
      {renderItemModal()}
    </div>
  );
}
