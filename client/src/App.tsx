import { useAuthInit } from "@/hooks/useAuthInit";
import Layout from "@/layouts/Layout";
import MonthlyStatsPage from "@/pages/MonthlyStatsPage";
import WeeklyStatsPage from "@/pages/WeeklyStatsPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import OauthCallback from "./pages/OauthCallback";
import PrivateRoute from "./router/PrivateRoute";

function App() {
  useAuthInit();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/oauth/callback" element={<OauthCallback />} />

      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats/weekly" element={<WeeklyStatsPage />} />
        <Route path="/stats/monthly" element={<MonthlyStatsPage />} />
        <Route path="/*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
