import { useHomePageStore } from "@/stores/useHomePageStore";
import { useTodoStore } from "@/stores/useTodoStore";
import { cn } from "@/utils/cn";
import { FiCheck, FiCheckCircle, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

// 수정 버튼
export function EditButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="p-1 hover:bg-gray-100 rounded transition"
      onClick={onClick}
      disabled={disabled}
      title="수정"
      type="button">
      <FiEdit2 size={18} className="text-gray-600" />
    </button>
  );
}

// 삭제 버튼
export function DeleteButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="p-1 hover:bg-gray-100 rounded transition"
      onClick={onClick}
      disabled={disabled}
      title="삭제"
      type="button">
      <FiTrash2 size={18} className="text-gray-600" />
    </button>
  );
}

// 저장 버튼
export function SaveButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="p-1 hover:bg-gray-100 rounded transition"
      onClick={onClick}
      disabled={disabled}
      title="저장"
      type="button">
      <FiCheck size={18} className="text-gray-600" />
    </button>
  );
}

// 취소 버튼
export function CancelButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="p-1 hover:bg-gray-100 rounded transition"
      onClick={onClick}
      disabled={disabled}
      title="취소"
      type="button">
      <FiX size={18} className="text-gray-600" />
    </button>
  );
}

// 플랜 할당 아이콘
export function AssignPlanIcon({ todoId, disabled }: { todoId: number; disabled?: boolean }) {
  const assigningPlanTodoId = useHomePageStore((s) => s.assigningPlanTodoId);
  const setAssigningPlanTodoId = useHomePageStore((s) => s.setAssigningPlanTodoId);
  const assigningActionTodoId = useHomePageStore((s) => s.assigningActionTodoId);
  const setAssigningActionTodoId = useHomePageStore((s) => s.setAssigningActionTodoId);

  const todoDetails = useTodoStore((s) => s.todoDetails);
  const exists = todoDetails.some((todo) => todo.plan && todo.id === todoId);
  const isActive = assigningPlanTodoId === todoId;

  return (
    <button
      className={cn(
        "p-1 rounded border transition flex items-center justify-center text-sm font-bold w-6 h-6",
        exists
          ? "bg-gray-200 text-gray-700 border-gray-300"
          : isActive
          ? "bg-gray-600 text-white border-gray-700"
          : "hover:bg-gray-100 text-gray-600 border-gray-300"
      )}
      onClick={() => {
        if (exists) {
          toast.error("이미 할당된 플랜이 있습니다.");
        } else {
          if (assigningActionTodoId) setAssigningActionTodoId(null);
          if (assigningPlanTodoId === todoId) {
            setAssigningPlanTodoId(null);
          } else {
            setAssigningPlanTodoId(todoId);
          }
        }
      }}
      disabled={disabled}
      title={exists ? "플랜이 이미 할당됨" : isActive ? "선택됨" : "플랜 할당"}
      type="button">
      {exists ? <FiCheckCircle size={16} className="text-gray-600" /> : "P"}
    </button>
  );
}

// 액션 할당 아이콘
export function AssignActionIcon({ todoId, disabled }: { todoId: number; disabled?: boolean }) {
  const assigningActionTodoId = useHomePageStore((s) => s.assigningActionTodoId);
  const setAssigningActionTodoId = useHomePageStore((s) => s.setAssigningActionTodoId);
  const assigningPlanTodoId = useHomePageStore((s) => s.assigningPlanTodoId);
  const setAssigningPlanTodoId = useHomePageStore((s) => s.setAssigningPlanTodoId);

  const todoDetails = useTodoStore((s) => s.todoDetails);
  const exists = todoDetails.some((todo) => todo.action && todo.id === todoId);
  const isActive = assigningActionTodoId === todoId;

  return (
    <button
      className={cn(
        "p-1 rounded border transition flex items-center justify-center text-sm font-bold w-6 h-6",
        exists
          ? "bg-gray-200 text-gray-700 border-gray-300"
          : isActive
          ? "bg-gray-600 text-white border-gray-700"
          : "hover:bg-gray-100 text-gray-600 border-gray-300"
      )}
      onClick={() => {
        if (exists) {
          toast.error("이미 할당된 액션이 있습니다.");
        } else {
          if (assigningPlanTodoId) setAssigningPlanTodoId(null);
          if (assigningActionTodoId === todoId) {
            setAssigningActionTodoId(null);
          } else {
            setAssigningActionTodoId(todoId);
          }
        }
      }}
      disabled={disabled}
      title={exists ? "액션이 이미 할당됨" : isActive ? "선택됨" : "액션 할당"}
      type="button">
      {exists ? <FiCheckCircle size={16} className="text-gray-600" /> : "A"}
    </button>
  );
}
