import { createAction, deleteAction, updateAction } from "@/api/actionApi";
import { useTimeTableLogic } from "@/hooks/useTimeTableLogin";
import { useHomePageStore } from "@/stores/useHomePageStore";
import { useTodoStore } from "@/stores/useTodoStore";
import { TimeTableEntry } from "@/types/timetable";
import { getBorderClass } from "@/utils/borderUtil";
import { createBlockInfoMap } from "@/utils/createBlockInfoMap";
import { getCellIndex } from "@/utils/timeTableUtils";
import TimeTableItemModal from "./TimeTableItemModal";

export default function ActionTimeTable() {
  const assigningActionTodoId = useHomePageStore((s) => s.assigningActionTodoId);
  const setAssigningActionTodoId = useHomePageStore((s) => s.setAssigningActionTodo);
  const todoDetails = useTodoStore((s) => s.todoDetails);

  const actionEntries = todoDetails
    .filter((todo) => todo.action)
    .map((todo) => ({ todoDetail: todo, entry: todo.action } as TimeTableEntry));

  const {
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
  } = useTimeTableLogic(assigningActionTodoId, setAssigningActionTodoId, actionEntries, {
    create: createAction,
    update: updateAction,
    remove: deleteAction,
  });

  const totalCells = HOURS.length * MINUTES.length;
  const blockInfoMap = createBlockInfoMap(cellItemMap, totalCells);

  const isSelectedCell = (idx: number) =>
    dragStart !== null &&
    dragEnd !== null &&
    idx >= Math.min(dragStart, dragEnd) &&
    idx <= Math.max(dragStart, dragEnd);

  const getCellProps = (idx: number) => {
    const entry = cellItemMap[idx];
    const todoId = entry?.todoDetail?.id;
    const blockInfo = blockInfoMap[todoId ?? -1];

    return {
      entry,
      bgColor: entry?.todoDetail?.category?.color || (isSelectedCell(idx) ? "#bfdbfe" : "#fff"),
      borderClass: blockInfo
        ? getBorderClass(idx, blockInfo.startIdx, blockInfo.endIdx, MINUTES.length)
        : "",
    };
  };

  const renderCell = (hour: number, min: number) => {
    const idx = getCellIndex(hour, min);
    const { entry, bgColor, borderClass } = getCellProps(idx);

    return (
      <td
        key={idx}
        className={`border w-8 h-8 cursor-pointer ${borderClass}`}
        style={{ backgroundColor: bgColor, opacity: entry ? 0.7 : 1 }}
        title={entry?.todoDetail?.content}
        onMouseDown={!entry ? () => handleMouseDown(hour, min) : undefined}
        onMouseEnter={() => handleMouseEnter(hour, min)}
        onMouseUp={handleMouseUp}
        onClick={
          entry
            ? () => {
                setSelectedItem(entry);
                resetDrag();
              }
            : () => console.log(idx)
        }
      />
    );
  };

  return (
    <div className="overflow-x-auto" style={{ minWidth: 320, maxWidth: 420 }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold">Action Time Table</span>
        {assigningActionTodoId && (
          <p className="font-semibold text-blue-600 animate-pulse">📝 실행을 여기에 할당하세요!</p>
        )}
      </div>

      <table className="border text-xs select-none table-fixed w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1">시간</th>
            {MINUTES.map((m) => (
              <th key={m} className="border px-2 py-1">
                {m.toString().padStart(2, "0")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOURS.map((hour) => (
            <tr key={hour}>
              <td className="border px-2 py-1 font-bold bg-gray-50">
                {hour.toString().padStart(2, "0")}
              </td>
              {MINUTES.map((min) => renderCell(hour, min))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && dragMode !== "edit" && (
        <TimeTableItemModal
          open={!!selectedItem}
          selectedEntry={selectedItem}
          loading={loading}
          onDelete={handleDelete}
          onClose={() => {
            setSelectedItem(null);
            resetDrag();
          }}
        />
      )}
    </div>
  );
}
