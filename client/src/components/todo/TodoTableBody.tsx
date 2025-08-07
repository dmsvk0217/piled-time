import CheckSign from "@/components/common/CheckSign";
import {
  AssignActionIcon,
  AssignPlanIcon,
  CancelButton,
  DeleteButton,
  EditButton,
  SaveButton,
} from "@/components/todo/TodoTableButtons";
import { useTodoStore } from "@/stores/useTodoStore";
import { Todo } from "@/types/todo";
import { useState } from "react";

interface Props {
  onUpdate: (todo: Todo, data: Partial<Todo>) => Promise<void>;
  onDelete: (todo: Todo) => Promise<void>;
}

export default function TodoTableBody({ onUpdate, onDelete }: Props) {
  const todoDetails = useTodoStore((s) => s.todoDetails);

  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  if (todoDetails.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={4} className="text-gray-500 py-6 text-center">
            오늘 등록된 할 일이 없습니다.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {todoDetails.map((todo, idx) => {
        if (!todo) {
          return (
            <tr key={"empty-" + idx} className="bg-gray-50 text-gray-300 text-center">
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
            <td className="border px-4 py-2 text-center">
              <span
                className="inline-block w-4 h-4 rounded-sm mr-1.5 align-middle"
                style={{ backgroundColor: todo.category.color }}
              />
              <span className="align-middle">{todo.category.name}</span>
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
                  `inline-block relative w-4 h-4 rounded border border-gray-300 align-middle ` +
                  (!!(todo.plan || todo.action) ? "bg-gray-300" : "bg-white")
                }>
                {!!(todo.plan || todo.action) && <CheckSign />}
              </span>
            </td>

            {/* 달성률 */}
            <td className="border px-2 py-2 ">
              <div
                className={`
                  w-full h-6 rounded cursor-pointer flex items-center justify-center select-none border hover:shadow transition
                  ${percent === 0 ? "bg-white text-gray-800" : ""}
                  ${percent === 25 ? "bg-gray-100 text-gray-800" : ""}
                  ${percent === 50 ? "bg-gray-300 text-gray-800" : ""}
                  ${percent === 75 ? "bg-gray-500 text-white" : ""}
                  ${percent === 100 ? "bg-gray-700 text-white" : ""}
                `}
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
              <span className="flex gap-1 items-center overflow-x-visible">
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
                <AssignPlanIcon todoId={todo.id} disabled={isEditing} />
                <AssignActionIcon todoId={todo.id} disabled={isEditing} />
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
