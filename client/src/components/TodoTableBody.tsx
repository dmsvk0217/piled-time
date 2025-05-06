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

  return (
    <tbody>
      {todos.map((todo) => {
        const percent = manualPercents[todo.id] ?? 0;

        return (
          <tr key={todo.id}>
            <td className="border px-4 py-2">{todo.category.name}</td>
            <td className="border px-4 py-2">✅</td>
            <td className="border px-4 py-2">{todo.content}</td>
            <td className="border px-4 py-2">
              <div className="w-full bg-gray-200 h-4 rounded mb-1">
                <div className="bg-gray-700 h-4 rounded" style={{ width: `${percent}%` }} />
              </div>
              <input
                type="number"
                className="border w-16 text-center"
                min={0}
                max={100}
                value={percent}
                onChange={(e) =>
                  setManualPercents((prev) => ({
                    ...prev,
                    [todo.id]: Math.min(100, Math.max(0, Number(e.target.value))),
                  }))
                }
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
