import React from "react";
import { Routes, Route } from "react-router-dom";
import DailyPlannerPage from "./pages/DailyPlannerPage";
import WeeklyStatisticsPage from "./pages/WeeklyStatisticsPage";
import CalendarPage from "./pages/CalendarPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DailyPlannerPage />} />
      <Route path="/daily-planner" element={<DailyPlannerPage />} />
      <Route path="/weekly-statistics" element={<WeeklyStatisticsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />

      <Route path="*" element={<DailyPlannerPage />} />
    </Routes>
  );
}

export default App;
