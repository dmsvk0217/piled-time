import { Todo } from "@/types/planner";

interface Props {
  todos: Todo[];
  manualPercents: { [key: string]: number };
  setManualPercents: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

export default function TodoTableBody({ todos, manualPercents, setManualPercents }: Props) {
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
        return (
          <tr key={todo.id}>
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
            <td className="border px-4 py-2">{todo.content}</td>
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
          </tr>
        );
      })}
    </tbody>
  );
}
