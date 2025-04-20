import { Link, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import DemoPage from "./pages/DemoPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import OauthCallback from "./pages/OauthCallback";
import PrivateRoute from "./router/PrivateRoute";

function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/demo">Demo</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/callback" element={<OauthCallback />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </div>
  );
}

export default App;
