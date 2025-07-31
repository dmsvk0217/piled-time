import { Todo } from "@/types/todo";
import { useState } from "react";
import { FiCheck, FiEdit2, FiPlusSquare, FiTrash2, FiX } from "react-icons/fi";

interface Props {
  todos: Todo[];
  onUpdate: (todo: Todo, data: Partial<Todo>) => Promise<void>;
  onDelete: (todo: Todo) => Promise<void>;
  assigningActionTodoId: number | null;
  setAssigningActionTodo: (id: number | null) => void;
  assigningPlanTodoId: number | null;
  setAssigningPlanTodo: (id: number | null) => void;
}

function EditButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
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

function DeleteButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
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

function SaveButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
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

function CancelButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
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

function AssignActionIcon({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="p-1 hover:bg-green-100 rounded transition"
      onClick={onClick}
      disabled={disabled}
      title="액션 할당"
      type="button">
      <FiPlusSquare size={18} color="#22c55e" />
    </button>
  );
}

function AssignPlanIcon({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="p-1 hover:bg-green-100 rounded transition"
      onClick={onClick}
      disabled={disabled}
      title="플랜 할당"
      type="button">
      <FiPlusSquare size={18} color="#22c55e" />
    </button>
  );
}

export default function TodoTableBody({
  todos,
  onUpdate,
  onDelete,
  assigningActionTodoId,
  setAssigningActionTodo,
  assigningPlanTodoId,
  setAssigningPlanTodo,
}: Props) {
  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  if (todos.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={4} className="text-gray-500 py-6">
            오늘 등록된 할 일이 없습니다.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {todos.map((todo, idx) => {
        if (!todo) {
          return (
            <tr key={"empty-" + idx} className="bg-gray-50 text-gray-300">
              <td className="border px-4 py-2" colSpan={4}>
                &nbsp;
              </td>
            </tr>
          );
        }
        const percent = todo.percent ?? 0;
        const isEditing = editId === todo.id;
        return (
          <tr key={todo.id} className="group">
            {/* 카테고리 */}
            <td className="border px-4 py-2">
              <span
                style={{
                  display: "inline-block",
                  width: 16,
                  height: 16,
                  backgroundColor: todo.category.color,
                  borderRadius: 3,
                  marginRight: 6,
                  verticalAlign: "middle",
                }}
              />
              {todo.category.name}
            </td>
            {/* 세부내용 */}
            <td className="border px-4 py-2">
              {isEditing ? (
                <input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="border px-2 py-1 rounded w-40 focus:outline-blue-400"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      (async () => {
                        setEditLoading(true);
                        await onUpdate(todo, { content: editContent });
                        setEditId(null);
                        setEditLoading(false);
                      })();
                    } else if (e.key === "Escape") {
                      setEditId(null);
                    }
                  }}
                />
              ) : (
                todo.content
              )}
            </td>
            {/* 배치 */}
            <td className="border px-1 py-2 text-center align-middle bg-white">
              <span
                className={
                  `inline-block w-4 h-4 rounded border border-gray-300 align-middle ` +
                  (!!(todo.plans?.length || todo.actions?.length) ? "bg-gray-300" : "bg-white")
                }
                style={{ position: "relative", pointerEvents: "none" }}>
                {!!(todo.plans?.length || todo.actions?.length) && (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <path
                      d="M4 8.5L7 11.5L12 5.5"
                      stroke="#444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </td>

            {/* 달성률 */}
            <td className="border px-2 py-2">
              <div
                className="w-full h-6 rounded cursor-pointer flex items-center justify-center select-none border hover:shadow transition"
                style={{
                  background:
                    percent === 0
                      ? "#fff" // 0%: 흰색
                      : percent === 25
                      ? "#f3f4f6" // 25%: 아주 연한 회색
                      : percent === 50
                      ? "#d1d5db" // 50%: 연회색
                      : percent === 75
                      ? "#9ca3af" // 75%: 중간회색
                      : percent === 100
                      ? "#6b7280" // 100%: 진한회색
                      : "#fff",
                  color: percent < 75 ? "#222" : "#fff",
                  transition: "background 0.2s",
                }}
                title="클릭해서 달성률을 변경할 수 있습니다"
                onClick={async () => {
                  const percentSteps = [0, 25, 50, 75, 100];
                  const currentIdx = percentSteps.indexOf(percent);
                  const nextPercent = percentSteps[(currentIdx + 1) % percentSteps.length];
                  await onUpdate(todo, { percent: nextPercent });
                }}>
                <span className="mr-1">{percent}%</span>
              </div>
            </td>
            {/* buttons */}
            <td className="min-w-[80px] text-center relative whitespace-nowrap overflow-x-visible">
              <span className="hidden group-hover:inline-flex gap-1 items-center overflow-x-visible">
                {isEditing ? (
                  <>
                    <SaveButton
                      onClick={async () => {
                        setEditLoading(true);
                        await onUpdate(todo, { content: editContent });
                        setEditId(null);
                        setEditLoading(false);
                      }}
                      disabled={editLoading || !editContent.trim()}
                    />
                    <CancelButton onClick={() => setEditId(null)} disabled={editLoading} />
                  </>
                ) : (
                  <>
                    <EditButton
                      onClick={() => {
                        setEditId(todo.id);
                        setEditContent(todo.content);
                      }}
                    />
                    <DeleteButton
                      onClick={async () => {
                        if (window.confirm("정말 삭제하시겠습니까?")) {
                          setEditLoading(true);
                          await onDelete(todo);
                          setEditLoading(false);
                        }
                      }}
                      disabled={editLoading}
                    />
                  </>
                )}
                <AssignPlanIcon
                  onClick={() => setAssigningPlanTodo(todo.id)}
                  disabled={isEditing || assigningPlanTodoId === todo.id}
                />
                <AssignActionIcon
                  onClick={() => setAssigningActionTodo(todo.id)}
                  disabled={isEditing || assigningActionTodoId === todo.id}
                />
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
