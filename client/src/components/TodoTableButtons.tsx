import { useHomePageStore } from "@/stores/useHomePageStore";
import { useTodoStore } from "@/stores/useTodoStore";
import { FiCheck, FiEdit2, FiPlusSquare, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

export function EditButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="p-1 hover:bg-blue-100 rounded transition"
      onClick={onClick}
      disabled={disabled}
      title="수정"
      type="button">
      <FiEdit2 size={18} color="#2563eb" />
    </button>
  );
}

export function DeleteButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="p-1 hover:bg-red-100 rounded transition"
      onClick={onClick}
      disabled={disabled}
      title="삭제"
      type="button">
      <FiTrash2 size={18} color="#ef4444" />
    </button>
  );
}

export function SaveButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="p-1 hover:bg-green-100 rounded transition"
      onClick={onClick}
      disabled={disabled}
      title="저장"
      type="button">
      <FiCheck size={18} color="#16a34a" />
    </button>
  );
}

export function CancelButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="p-1 hover:bg-gray-100 rounded transition"
      onClick={onClick}
      disabled={disabled}
      title="취소"
      type="button">
      <FiX size={18} color="#6b7280" />
    </button>
  );
}

export function AssignActionIcon({ todoId, disabled }: { todoId: number; disabled?: boolean }) {
  const setAssigningActionTodo = useHomePageStore((s) => s.setAssigningActionTodo);
  const todoDetails = useTodoStore((s) => s.todoDetails);
  const exists = todoDetails.some((todo) => todo.action && todo.id === todoId);

  return (
    <button
      className="p-1 hover:bg-green-100 rounded transition"
      onClick={() => {
        if (exists) {
          toast.error("이미 할당된 액션이 있습니다.");
        } else {
          setAssigningActionTodo(todoId);
        }
      }}
      disabled={disabled}
      title="액션 할당"
      type="button">
      <FiPlusSquare size={18} color="#22c55e" />
    </button>
  );
}

export function AssignPlanIcon({ todoId, disabled }: { todoId: number; disabled?: boolean }) {
  const setAssigningPlanTodo = useHomePageStore((s) => s.setAssigningPlanTodo);
  const todoDetails = useTodoStore((s) => s.todoDetails);
  const exists = todoDetails.some((todo) => todo.plan && todo.id === todoId);

  return (
    <button
      className="p-1 hover:bg-green-100 rounded transition"
      onClick={() => {
        if (exists) {
          toast.error("이미 할당된 플랜이 있습니다.");
        } else {
          setAssigningPlanTodo(todoId);
        }
      }}
      disabled={disabled}
      title="플랜 할당"
      type="button">
      <FiPlusSquare size={18} color="#22c55e" />
    </button>
  );
}
