import { Todo } from "@/types/todo";

interface Props {
  todos: Todo[];
}

export default function TodoSummaryTable({ todos }: Props) {
  return (
    <div className="overflow-auto rounded border border-gray-200">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">날짜</th>
            <th className="px-4 py-2">카테고리</th>
            <th className="px-4 py-2">내용</th>
            <th className="px-4 py-2">계획 시간</th>
            <th className="px-4 py-2">실행 시간</th>
            <th className="px-4 py-2">달성률</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            const planMin = todo.plan?.duration || 0;
            const actionMin = todo.action?.duration || 0;
            return (
              <tr key={todo.id} className="border-t">
                <td className="px-4 py-2">{todo.date.slice(5, 10).replace("-", "/")}</td>
                <td className="px-4 py-2">{todo.category.name}</td>
                <td className="px-4 py-2">{todo.content}</td>
                <td className="px-4 py-2">
                  {Math.floor(planMin / 60)}h {planMin % 60}m
                </td>
                <td className="px-4 py-2">
                  {Math.floor(actionMin / 60)}h {actionMin % 60}m
                </td>
                <td className="px-4 py-2">{todo.percent}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
