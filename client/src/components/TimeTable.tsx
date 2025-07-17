import { deleteAction, updateAction } from "@/api/actionApi";
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
  const [selectedAction, setSelectedAction] = useState<any | null>(null); // action + todo + category
  const [editAction, setEditAction] = useState<any | null>(null); // 시간대 수정용 action
  const [isEditMode, setIsEditMode] = useState(false);
  const [editDragStart, setEditDragStart] = useState<number | null>(null);
  const [editDragEnd, setEditDragEnd] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

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

  const resetDrag = () => {
    setDragStart(null);
    setDragEnd(null);
    setIsDragging(false);
    setIsEditMode(false);
    setEditDragStart(null);
    setEditDragEnd(null);
  };

  const handleMouseDown = (hour: number, min: number) => {
    if (isEditMode) {
      const idx = getCellIndex(hour, min);
      setEditDragStart(idx);
      setEditDragEnd(idx);
      setIsDragging(true);
    } else {
      if (!assigningTodoId) return; // assigningTodoId 없으면 드래그 불가
      const idx = getCellIndex(hour, min);
      setDragStart(idx);
      setDragEnd(idx);
      setIsDragging(true);
    }
  };

  const handleMouseEnter = (hour: number, min: number) => {
    if (!isDragging) return;
    const idx = getCellIndex(hour, min);
    if (isEditMode) {
      if (editDragStart === null) return;
      if (idx === editDragStart) return;
      let limitIdx = idx;
      if (idx > editDragStart) {
        for (let i = editDragStart + 1; i <= idx; i++) {
          if (cellActionMap[i] && cellActionMap[i].id !== selectedAction?.id) {
            limitIdx = i - 1;
            break;
          }
        }
      } else {
        for (let i = editDragStart - 1; i >= idx; i--) {
          if (cellActionMap[i] && cellActionMap[i].id !== selectedAction?.id) {
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
    }
  };

  const handleMouseUp = () => {
    if (isEditMode) {
      console.log("🚀 ~ handleMouseUp ~ isEditMode:", isEditMode);
      console.log("🚀 ~ handleMouseUp ~ editDragEnd:", editDragEnd);
      console.log("🚀 ~ handleMouseUp ~ editDragStart:", editDragStart);
      console.log("🚀 ~ handleMouseUp ~ selectedAction:", selectedAction);

      if (
        editAction &&
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
        updateAction(editAction.id, { startAt: startAt.toISOString(), duration })
          .then(() => window.location.reload())
          .finally(() => setLoading(false));
      }
      setIsEditMode(false);
      setEditAction(null);
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
      onAssignPlan(assigningTodoId, startAt, duration, resetDrag);
    }
    resetDrag();
  };

  const isSelected = (idx: number) => {
    if (isEditMode) {
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

  // 팝오버/모달 렌더링
  const renderActionModal = () => {
    if (!selectedAction) return null;
    const start = new Date(selectedAction.startAt);
    const end = new Date(start.getTime() + selectedAction.duration * 60000);
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
          setSelectedAction(null);
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
            <b>할 일:</b> {selectedAction.todo?.content}
            <br />
            <b>카테고리:</b> {selectedAction.category?.name}
            <br />
            <b>시간:</b> {start.getHours().toString().padStart(2, "0")}:
            {start.getMinutes().toString().padStart(2, "0")} ~{" "}
            {end.getHours().toString().padStart(2, "0")}:
            {end.getMinutes().toString().padStart(2, "0")}
          </div>
          <button
            onClick={() => {
              setIsEditMode(true);
              setEditAction(selectedAction);
              setEditDragStart(getCellIndex(start.getHours(), start.getMinutes()));
              setEditDragEnd(
                getCellIndex(start.getHours(), start.getMinutes()) +
                  Math.ceil(selectedAction.duration / 10) -
                  1
              );
              setSelectedAction(null);
            }}
            disabled={isEditMode || loading}
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
              await deleteAction(selectedAction.id);
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
              setSelectedAction(null);
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
                const action = cellActionMap[idx];
                const bgColor = action?.category?.color || (isSelected(idx) ? "#bfdbfe" : "#fff");
                return (
                  <td
                    key={min}
                    className={`border w-8 h-8 cursor-pointer`}
                    style={{ backgroundColor: bgColor, opacity: action ? 0.7 : 1 }}
                    onMouseDown={
                      action
                        ? () => {
                            setSelectedAction(action);
                            resetDrag();
                          }
                        : () => handleMouseDown(hour, min)
                    }
                    onMouseEnter={() => handleMouseEnter(hour, min)}
                    onMouseUp={handleMouseUp}
                    title={action ? action.todo?.content : undefined}></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {renderActionModal()}
    </div>
  );
}
