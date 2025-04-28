import Layout from "@/layouts/Layout";
import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import DemoPage from "./pages/DemoPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import OauthCallback from "./pages/OauthCallback";
import PrivateRoute from "./router/PrivateRoute";

function App() {
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
