import { useHomePageStore } from "@/stores/useHomePageStore";
import { useTodoStore } from "@/stores/useTodoStore";
import { TimeTableEntry } from "@/types/timetable";
import {
  buildCellItemMap,
  getCellIndex,
  getItemCellIndexes,
  getTimeByCellIndex,
  HOURS,
  MINUTES,
} from "@/utils/timeTableUtils";
import { useState } from "react";

export function useTimeTableLogic(
  assigningTodoId: number | null,
  setAssigningTodoId: (id: number | null) => void,
  timeTableEntries: TimeTableEntry[],
  crudFns: {
    create: (todoId: number, startAt: string, duration: number) => Promise<any>;
    update: (id: number, data: { startAt: string; duration: number }) => Promise<any>;
    remove: (id: number) => Promise<any>;
  }
) {
  const date = useHomePageStore((s) => s.date);
  const fetchTododetails = useTodoStore((s) => s.fetchTododetails);

  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragEnd, setDragEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TimeTableEntry | null>(null);
  const [dragMode, setDragMode] = useState<null | "assign" | "edit">(null);
  const [loading, setLoading] = useState(false);

  const cellItemMap = buildCellItemMap(timeTableEntries, getItemCellIndexes);

  const resetDrag = () => {
    setDragStart(null);
    setDragEnd(null);
    setIsDragging(false);
    setDragMode(null);
    setAssigningTodoId(null);
  };

  const handleMouseDown = (hour: number, min: number) => {
    if (!assigningTodoId && !selectedItem) return;
    const idx = getCellIndex(hour, min);
    setDragMode(assigningTodoId ? "assign" : "edit");
    setDragStart(idx);
    setDragEnd(idx);
    setIsDragging(true);
  };

  const handleMouseEnter = (hour: number, min: number) => {
    if (!isDragging || dragStart === null) return;
    const idx = getCellIndex(hour, min);
    if (idx === dragStart) return;

    let limitIdx = idx;
    const isBlocked = (i: number) => {
      const timeTableEntry = cellItemMap[i];
      return timeTableEntry && (!selectedItem || timeTableEntry.entry.id !== selectedItem.entry.id);
    };

    if (idx > dragStart) {
      for (let i = dragStart + 1; i <= idx; i++) {
        if (isBlocked(i)) {
          limitIdx = i - 1;
          break;
        }
      }
    } else {
      for (let i = dragStart - 1; i >= idx; i--) {
        if (isBlocked(i)) {
          limitIdx = i + 1;
          break;
        }
      }
    }

    setDragEnd(limitIdx);
  };

  const handleMouseUp = async () => {
    if (dragStart === null || dragEnd === null) return;

    const minIdx = Math.min(dragStart, dragEnd);
    const maxIdx = Math.max(dragStart, dragEnd);
    const duration = (maxIdx - minIdx + 1) * 10;

    const { hour, min } = getTimeByCellIndex(minIdx);
    const startAt = new Date();
    startAt.setHours(hour, min, 0, 0);
    const startISO = startAt.toISOString();

    setLoading(true);
    try {
      if (dragMode === "edit" && selectedItem) {
        await crudFns.update(selectedItem.entry.id, { startAt: startISO, duration });
      } else if (dragMode === "assign" && assigningTodoId) {
        await crudFns.create(assigningTodoId, startISO, duration);
      }
      await fetchTododetails(date);
    } finally {
      setLoading(false);
      resetDrag();
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setLoading(true);
    await crudFns.remove(selectedItem.entry.id);
    await fetchTododetails(date);
    setSelectedItem(null);
    setLoading(false);
  };

  return {
    HOURS,
    MINUTES,
    cellItemMap,
    dragStart,
    dragEnd,
    selectedItem,
    loading,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleDelete,
    setSelectedItem,
    resetDrag,
    dragMode,
    setDragMode,
  };
}
