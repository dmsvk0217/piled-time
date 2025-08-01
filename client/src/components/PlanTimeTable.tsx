import { createPlan, deletePlan, updatePlan } from "@/api/planApi";
import TimeTableItemModal from "@/components/TimeTableItemModal";
import { useTimeTableLogic } from "@/hooks/useTimeTableLogin";
import { useHomePageStore } from "@/stores/useHomePageStore";
import { useTodoStore } from "@/stores/useTodoStore";
import { TimeTableEntry } from "@/types/timetable";

export default function PlanTimeTable() {
  const assigningPlanTodoId = useHomePageStore((s) => s.assigningPlanTodoId);
  const setAssigningPlanTodoId = useHomePageStore((s) => s.setAssigningPlanTodo);
  const todoDetails = useTodoStore((s) => s.todoDetails);

  const planEntries = todoDetails
    .filter((todo) => todo.plan)
    .map((todo) => ({ todoDetail: todo, entry: todo.plan } as TimeTableEntry));

  const {
    HOURS,
    MINUTES,
    cellItemMap,
    dragStart,
    dragEnd,
    selectedItem: selectedEntry,
    loading,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleDelete,
    setSelectedItem: setSelectedEntry,
    resetDrag,
    dragMode,
  } = useTimeTableLogic(assigningPlanTodoId, setAssigningPlanTodoId, planEntries, {
    create: createPlan,
    update: updatePlan,
    remove: deletePlan,
  });

  return (
    <div className="overflow-x-auto" style={{ minWidth: 320, maxWidth: 420 }}>
      <div className="flex">
        <div className="font-bold mb-1">Plan Time Table</div>
        <p className={`font-semibold ${assigningPlanTodoId ? "text-blue-600 animate-pulse" : ""}`}>
          {assigningPlanTodoId ? "📝 계획을 여기에 할당하세요!" : ""}
        </p>
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
              {MINUTES.map((min) => {
                const idx = (hour - 6) * 6 + min / 10;
                const timeTableEntry = cellItemMap[idx];
                const isSelected =
                  dragStart !== null &&
                  dragEnd !== null &&
                  idx >= Math.min(dragStart, dragEnd) &&
                  idx <= Math.max(dragStart, dragEnd);
                const bgColor =
                  timeTableEntry?.todoDetail?.category?.color || (isSelected ? "#bfdbfe" : "#fff");

                return (
                  <td
                    key={idx}
                    className="border w-8 h-8 cursor-pointer"
                    style={{ backgroundColor: bgColor, opacity: timeTableEntry ? 0.7 : 1 }}
                    onMouseDown={!timeTableEntry ? () => handleMouseDown(hour, min) : undefined}
                    onClick={
                      timeTableEntry
                        ? () => {
                            setSelectedEntry(timeTableEntry);
                            resetDrag();
                          }
                        : undefined
                    }
                    onMouseEnter={() => handleMouseEnter(hour, min)}
                    onMouseUp={handleMouseUp}
                    title={timeTableEntry?.todoDetail?.content}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEntry && dragMode !== "edit" && (
        <TimeTableItemModal
          open={!!selectedEntry}
          selectedEntry={selectedEntry}
          loading={loading}
          onDelete={handleDelete}
          onClose={() => {
            setSelectedEntry(null);
            resetDrag();
          }}
        />
      )}
    </div>
  );
}
