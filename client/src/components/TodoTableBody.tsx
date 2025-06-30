import { Todo } from "@/types/planner";
import { useState } from "react";
import { FiCheck, FiEdit2, FiPlusSquare, FiTrash2, FiX } from "react-icons/fi";

interface Props {
  todos: Todo[];
  onUpdate: (todo: Todo, data: Partial<Todo>) => Promise<void>;
  onDelete: (todo: Todo) => Promise<void>;
  assigningTodoId: number | null;
  setAssigningTodo: (id: number | null) => void;
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

function AssignButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="p-1 hover:bg-green-100 rounded transition"
      onClick={onClick}
      disabled={disabled}
      title="타임테이블에 배치"
      type="button">
      <FiPlusSquare size={18} color="#22c55e" />
    </button>
  );
}

export default function TodoTableBody({
  todos,
  onUpdate,
  onDelete,
  assigningTodoId,
  setAssigningTodo,
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

  const MAX_ROWS = 20;
  const rows = Array.from({ length: MAX_ROWS }, (_, i) => todos[i] || null);

  return (
    <tbody>
      {rows.map((todo, idx) => {
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
            <td className="border px-1 py-2 text-center align-middle">
              <input
                type="checkbox"
                checked={!!(todo.plans?.length || todo.actions?.length)}
                readOnly
                style={{ width: 16, height: 16 }}
              />
            </td>
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
            <td className="border px-2 py-2">
              <div
                className="w-full h-6 rounded cursor-pointer flex items-center justify-center select-none"
                style={{
                  background:
                    percent === 0
                      ? "#e5e7eb"
                      : percent === 25
                      ? "#60a5fa"
                      : percent === 50
                      ? "#38bdf8"
                      : percent === 75
                      ? "#34d399"
                      : percent === 100
                      ? "#22c55e"
                      : "#e5e7eb",
                  color: percent === 0 ? "#888" : "#fff",
                  transition: "background 0.2s",
                }}
                onClick={() => {
                  alert("달성률 변경은 추후 서버 연동 예정입니다.");
                }}>
                {percent}%
              </div>
            </td>
            <td className="border px-2 py-2">
              <div
                className={`flex gap-1 justify-center items-center ${
                  isEditing ? "" : "hidden group-hover:flex"
                }`}>
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
                <AssignButton
                  onClick={() => setAssigningTodo(todo.id)}
                  disabled={isEditing || assigningTodoId === todo.id}
                />
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
