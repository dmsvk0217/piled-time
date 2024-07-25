import React from "react";

const DailyPlannerPage = () => {
  // 더미 데이터
  const todos = [
    { id: 1, category: "Work", details: "Finish report", timetable: true, progress: 0.5 },
    { id: 2, category: "Personal", details: "Buy groceries", timetable: false, progress: 1 },
  ];

  return (
    <div>
      <h1>Daily Planner Page</h1>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.category} - {todo.details} - {todo.progress}
          </li>
        ))}
      </ul>
      <h2>Time Table</h2>
      <ul>
        {todos
          .filter((todo) => todo.timetable)
          .map((todo) => (
            <li key={todo.id}>
              {todo.category} - {todo.details} - {todo.progress}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DailyPlannerPage;
